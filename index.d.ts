
import * as React from "react";
export interface Permissions {
    push?(item: string): void;
    insert?(array: string[]): void;
    get?(): string[];
}

export interface Role {
    set?(item: string): void;
    get?(): string;
}

interface GuardedProps {
    oneOf?: boolean;
    permissions?: string[];
    Owner?: any | React.Component;
    hasRole?: string[];
}
export declare class Guarded extends React.Component<GuardedProps, any> {}
