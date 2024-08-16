# @navigraph/amdb

This package is part of the Navigraph SDK, and is intended to be used in conjuction with other SDK modules.
See the [navigraph](https://www.npmjs.com/package/navigraph) package for usage.

> [!WARNING]
> ### When real number or integer (non enumerated) values in AMDB feature properties have no value, it is represented with one of the three following default values:
> | Data Type | Null   | Unknown | Not Applicable | Not Entered |
> | --------- | ------ | ------- | -------------- | ----------- |
> | Value     | -32768 | -32767  | -32765         | -32764      |
>
> No-value strings will be all represented as a JSON `null` field, not `undefined` or `"$Null"`
