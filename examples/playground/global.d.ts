declare global {
    interface ObjectConstructor {
        entries<Key extends PropertyKey, Value>(obj: Record<Key, Value>): [Key, Value][];
    }
}