# @navigraph/amdb

This package is part of the Navigraph SDK, and is intended to be used in conjuction with other SDK modules.
See the [navigraph](https://www.npmjs.com/package/navigraph) package for usage.

> [!WARNING]
> ### When non-string (except for date/time) values in AMDB feature properties have no value, it is represented with one of the four following default values:
> | Data Type | Null       | Unknown    | Not Applicable | Not Entered |
> | --------- | ---------- | ---------- | -------------- | ----------- |
> | Integer   | -32768     | -32767     | -32765         | -32764      |
> | Float     | -32768.00  | -32767.00  | -32765.00      | -32764.00   |
> | Date      | 0000-00-00 | 0001-00-00 | 0002-00-00     | 0003-00-00  |
> | Time      | 25:00:00   | 26:00:00   | 27:00:00       | 28:00:00    |
>
> Note that the Date default values do not match the ER-009 spec, but matches the Jeppesen spec
>
> No-value strings will be all represented as a JSON `null` field, not `undefined` or `"$Null"`

