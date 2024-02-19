import {type PropsWithChildren, type ReactElement} from "react";

interface MessageProps extends PropsWithChildren {
    name: string;
}

export default function MessageWithChildren(
    {name, children}: MessageProps
): ReactElement {
    return (
        <div>
            <h2>Hello {name}!</h2>
            {children}
        </div>
    );
}
