# Development and recovery

The original package defines next build --webpack and next start through npm run build and npm start. It does not define a test script. These commands were not executed by this source import.

Before building, qualify the exact original installed dependencies, compatible Node version, build inputs and required asset tree. There is no lockfile in this preserved source scope, so a fresh dependency resolution must not be described as reproduction of the recorded installed tree. Restore required custom or modified dependency sources separately where the dependency evidence identifies them.

The original local build borrowed node_modules and public assets through host-specific aliases. [The alias record](original-local-bindings.json) preserves their relationships, while public scripts/vector/text bodies are now ordinary source files at the same logical paths. Do not rely on a former XXL absolute path as a recovery mechanism.

The remaining binary assets are listed in [remaining-assets.json](remaining-assets.json). Their complete content/hash/license relationship must be closed before claiming a full website recovery checkpoint. The qualified AWS release archive is separately identified in the source/artifact index; source commits, build IDs, image IDs and archive hashes remain distinct identities.

For later changes, keep existing source/route/provider relationships, review all changed file bodies and Git history for protected values, commit complete authorized source and documentation, and bind the resulting Git commit to the actual build artifact. Check external deploy triggers before pushing. Production release approval belongs to the responsible migration/deployment owner.

Secrets, private keys, protected provider bindings, customer data, database dumps and private runtime logs belong outside these source repositories. Safe configuration examples may be added only from actual variable/file contracts.
