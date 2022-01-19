import React from "react";
import { cnCreate } from "@megafon/ui-helpers";
import Copy from "@megafon/ui-icons/system-24-copy_24.svg";
import copy from "copy-text-to-clipboard";
import { PlaygroundProps } from "docz/dist/hooks/useComponents";
import { Language } from "prism-react-renderer";
import { LiveProvider, LiveError, LivePreview, LiveEditor } from "react-live";
import { ThemeContext } from "../../themeContext";
import { THEMES } from "./theme";
import { Wrapper } from "./Wrapper";
import "./Playground.less";

const transformCode = (code: string) => {
    if (code.startsWith("()") || code.startsWith("class")) return code;

    return `<React.Fragment>${code}</React.Fragment>`;
};

const cn = cnCreate("docz-playground");

export const Playground: React.FC<PlaygroundProps & { useScoping?: boolean }> =
    ({
        style,
        code,
        scope,
        language,
        useScoping = false,
        showEditor = true,
    }) => {
        const [scopeOnMount] = React.useState(scope);
        const copyCode = () => copy(code);

        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <LiveProvider
                        code={code}
                        scope={scopeOnMount}
                        transformCode={transformCode}
                        language={language as Language}
                        theme={THEMES[theme]}
                    >
                        <div className={cn("preview")}>
                            <Wrapper content="preview">
                                <LivePreview
                                    className={cn("preview-content")}
                                    data-testid="live-preview"
                                    style={style}
                                />
                            </Wrapper>
                        </div>
                        {showEditor && (
                            <Wrapper content="editor" useScoping={useScoping}>
                                <div className={cn("editor")}>
                                    <button className={cn("copy")} onClick={copyCode}>
                                        <Copy className={cn("icon")} />
                                    </button>
                                    <LiveEditor data-testid="live-editor" />
                                </div>
                            </Wrapper>
                        )}
                        <LiveError data-testid="live-error" />
                    </LiveProvider>
                )}
            </ThemeContext.Consumer>
        );
    };

export default Playground;
