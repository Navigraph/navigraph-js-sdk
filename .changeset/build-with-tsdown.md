---
"navigraph": patch
"@navigraph/app": patch
"@navigraph/auth": patch
"@navigraph/charts": patch
"@navigraph/packages": patch
"@navigraph/amdb": patch
"@navigraph/weather": patch
"@navigraph/leaflet": patch
---

Build with tsdown instead of tsup, and target ES2017 instead of ES2015, which is what Coherent GT in MSFS 2020 and 2024 supports. The exports and types are unchanged.
