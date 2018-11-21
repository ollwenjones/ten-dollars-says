import * as classNames from "classnames";
import * as React from "react";
import "./Tabs.css";

export interface TabsProps extends React.HTMLProps<{}> {
  labels: string[];
}

interface TabsState {
  selectedTabTitle: string;
}

export default class Tabs extends React.Component<TabsProps, TabsState> {
  state = { selectedTabTitle: "" };

  selectTab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({ selectedTabTitle: e.currentTarget.title });
  };

  getTabs = () =>
    this.props.labels.map(label => (
      <a
        key={label}
        title={label}
        className={classNames("tds-tabs__tab", {
          selected: label === this.getSelectedTitle()
        })}
        onClick={this.selectTab}
      >
        {label}
      </a>
    ));

  getSelectedTitle = () => this.state.selectedTabTitle || this.props.labels[0];

  getContents = () =>
    React.Children.toArray(this.props.children)[
      this.props.labels.indexOf(this.getSelectedTitle())
    ];

  public render() {
    return (
      <div className={classNames("tds-tabs", this.props.className)}>
        <div className="tds-tabs__container">{this.getTabs()}</div>
        <div className="tds-tabs__contents">{this.getContents()}</div>
      </div>
    );
  }
}
