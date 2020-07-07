import React from 'react';
import './index.less';

export default class Demo extends React.Component {
    static defaultProps = {
        title: "名称",
    }
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <div className="box-title">{this.props.title}</div>
        );
    }
}
