# ICONHOMZ Firestore Security Specification

## 1. Data Invariants
1. **Verified Identity**: All reads and writes require a signed-in Firebase Auth user with `request.auth.token.email_verified == true`.
2. **Ownership & PII Isolation**: `/users/{userId}` and `/enquiries/{enquiryId}` contain PII (`email`, `phone`). Only the document owner (`userId == request.auth.uid`) or a verified bootstrapped admin (`ramesh@iconhomz.com` or `admins/{uid}`) may read or list those documents.
3. **No Role Escalation**: Non-admin users may only create `/users/{userId}` with `role == 'member'` and cannot alter `role` or `uid` afterward.
4. **Immutable Ownership & Timestamps**: `createdAt == request.time` on create; `createdAt` and `userId` are immutable on update; `updatedAt == request.time` on update.
5. **Terminal State Lock**: Once `status == 'closed'`, non-admin users cannot mutate an enquiry.
6. **Strict Schema & Bounds**: Every write validates required/allowed keys via `hasAll` / `hasOnly`, string types, and `.size()` bounds.

## 2. Dirty Dozen Attack Vectors (Must Yield PERMISSION_DENIED)
1. Unauthenticated `get` on `/enquiries/ICN-100001`.
2. Unauthenticated `create` on `/enquiries/ICN-100001`.
3. Signed-in user with `email_verified: false` creating `/enquiries/ICN-100001`.
4. Shadow update adding `role: "admin"` during `/users/{uid}` create.
5. Non-admin updating `/users/{uid}` to elevate `role` from `"member"` to `"admin"`.
6. Identity spoofing: user A creating `/enquiries/ICN-100002` with `userId: "userB"`.
7. Cross-user PII read: user A reading `/enquiries/ICN-100002` owned by user B.
8. Unfiltered list scraping: user A listing `/enquiries` without matching `resource.data.userId == request.auth.uid`.
9. Oversized document ID (`> 128` chars) or invalid characters (`../foo`) on `/enquiries/{id}`.
10. Oversized `message` payload (`> 1000` chars) on `/enquiries/{id}`.
11. Timestamp forgery: client passing past `createdAt` instead of `request.time`.
12. Ghost field injection (`isApproved: true`) on `/enquiries/{id}` update.
