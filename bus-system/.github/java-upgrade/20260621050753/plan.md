# CVE Fix Plan (20260621050753)

- **Project**: bus-system
- **Generated**: 2026-06-21
- **Total CVEs found**: 1 across 1 dependency

## Vulnerable Dependencies

### 1. `org.postgresql:postgresql` — 42.7.10 → 42.7.11 ✅ Upgrade

| Severity | CVE | Description |
|----------|-----|-------------|
| HIGH | [CVE-2026-42198](https://github.com/advisories/CVE-2026-42198) | pgjdbc SCRAM authentication allows CPU exhaustion DoS via unbounded PBKDF2 iterations |

## Fix Plan

- Update `org.postgresql:postgresql` from `42.7.10` to `42.7.11`.
- Use Maven wrapper and local JDK 26.0.1 to verify compilation.
- Run `./mvnw.cmd clean test-compile` and, if successful, `./mvnw.cmd clean test`.

## Options

- Minimum severity to fix: CRITICAL only
- Working branch: `appmod/cve-fix-20260621050753`
