import React from "react";
import { Logo } from "@megafon/ui-core";
import { cnCreate, applyTheme } from "@megafon/ui-helpers";
import LightbulbIcon from "@megafon/ui-icons/basic-16-lightbulb_16.svg";
import { useCurrentDoc } from "docz";
import { ThemeContext } from "../../themeContext";
import Menu from "../Menu";
import "./SideBar.less";

const cn = cnCreate("docz-sidebar");

const SideBar: React.FC = () => {
    const currentDoc = useCurrentDoc();

    const themeContext = React.useContext(ThemeContext);

    React.useEffect(() => {
        const current = document.getElementById(currentDoc.route);
        const option = { threshold: 0 };

        current &&
            window.IntersectionObserver &&
            new window.IntersectionObserver((entries, obs) => {
                const [entry] = entries;
                if (entry && !entry.isIntersecting) {
                    current.scrollIntoView();
                }
                obs.disconnect();
            }, option).observe(current);
    }, [currentDoc.route]);

    const toggleTheme = React.useCallback(() => {
        const newTheme = themeContext.theme === "light" ? "dark" : "light";

        // update context
        themeContext.setTheme(newTheme);

        // apply theme to document
        applyTheme(newTheme);
    }, [themeContext]);

    return (
        <div className={cn()}>
            <div className={cn("logo-wrapper")}>
                <Logo className={cn("logo")} href="/intro" target="_self" />
            </div>
            <div className={cn("menu")}>
                <Menu />
            </div>
            <div
                className={cn("theme-switcher")}
                data-current-theme={themeContext.theme}
            >
                <LightbulbIcon onClick={toggleTheme} />
            </div>
        </div>
    );
};

export default SideBar;
