declare module "react-guarded" {
    import * as React from "react";
    interface GuardedProps {
        oneOf?: boolean;
        permissions?: string[];
        Owner?: any | React.Component;
        hasRole?: string[];
    }
    export class Guarded extends React.Component<GuardedProps, any> {}

    export class Permissions {
        static push(item: string): void;
        static insert(array: string[]): void;
        static get(): string[];
    }
    
    export class Role {
        static set(item: string): void;
        static get(): string;
    }
}