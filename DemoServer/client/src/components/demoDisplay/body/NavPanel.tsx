import * as React from "react";
import { AppState } from "../../../store/state";
import { DemoThunkDispatch } from "../../../store";
import { runDemo } from "../../../store/actions/demo";
import { connect } from "react-redux";
import { selectFirstWalkthroughUrl } from "../../../store/selectors/walkthroughUrls";
import { IconPlay, IconStudio, IconLearn, IconLab } from "../../helpers/icons";

interface NavPanelStateProps {
    language: string;
    categorySlug: string;
    codeFileUrl: string;
    demoSlug: string;
    firstWtUrl?: string;
    studioUrl?: string;
    hideRunButton: boolean;
    hideWalkthroughButton: boolean;
}

interface NavPanelDispatchProps {
    onRunScriptClicked: () => void;
}

type NavPanelProps = NavPanelStateProps & NavPanelDispatchProps;

class NavPanelComponent extends React.Component<NavPanelProps, {}> {
    handleRunScriptClick() {
        const { onRunScriptClicked } = this.props;
        onRunScriptClicked();
    }

    nonCsharpDemoMessage() {
        const { language } = this.props;
        return (
            language !== "csharp" && (
                <div className="text-msg padding padding-xs margin-right">
                    Note:
                    <br /> Results viewed in the Studio are C# based,
                    <br />
                    i.e. index fields will be PascalCase
                </div>
            )
        );
    }

    gitPodButton() {
        const { codeFileUrl } = this.props;
        return (
            codeFileUrl && (
                <a
                    href={codeFileUrl}
                    id="openGitPod"
                    className="fab"
                    target="_blank"
                >
                    <IconLab /> <span>Open in GitPod</span>
                </a>
            )
        );
    }

    studioButton() {
        const { studioUrl } = this.props;
        return (
            studioUrl && (
                <a
                    href={studioUrl}
                    id="openStudio"
                    className="fab"
                    target="_blank"
                >
                    <IconStudio /> <span>Open in studio</span>
                </a>
            )
        );
    }

    walkthroughButton() {
        const { firstWtUrl } = this.props;
        return (
            <a
                href={firstWtUrl}
                role="button"
                id="startWalkthrough"
                className="fab"
            >
                <IconLearn /> <span>Walkthrough</span>
            </a>
        );
    }

    runScriptButton() {
        return (
            <button
                id="runScript"
                className="fab collapsed"
                type="button"
                onClick={() => this.handleRunScriptClick()}
            >
                <IconPlay /> <span>Run script</span>
            </button>
        );
    }

    render() {
        const { hideRunButton, hideWalkthroughButton } = this.props;
        return (
            <div className="fab-container">
                {this.nonCsharpDemoMessage()}
                {this.gitPodButton()}
                {this.studioButton()}
                {!hideWalkthroughButton && this.walkthroughButton()}
                {!hideRunButton && this.runScriptButton()}
            </div>
        );
    }
}

function mapStateToProps({ demos }: AppState): NavPanelStateProps {
    const { categorySlug, demoSlug, demo, conferenceMode, language } = demos;
    const nonInteractive = demo && demo.nonInteractive;
    const studioUrl = !nonInteractive && demo && demo.studioUrl;

    return {
        language,
        categorySlug,
        demoSlug,
        firstWtUrl: selectFirstWalkthroughUrl(demos),
        studioUrl,
        codeFileUrl:
            "https://gitpod.io/#https://github.com/kamranicus/ravendb-demo/tree/kamranayub-labs",
        hideRunButton: nonInteractive,
        hideWalkthroughButton: conferenceMode,
    };
}

function mapDispatchToProps(
    dispatch: DemoThunkDispatch
): NavPanelDispatchProps {
    return {
        onRunScriptClicked: () => dispatch(runDemo()),
    };
}

export const NavPanel = connect<NavPanelStateProps, NavPanelDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(NavPanelComponent);
