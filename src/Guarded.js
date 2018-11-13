import React, { Component } from 'react';


let _PERMISSIONS = [];

const HAT = (props) => {
    return props.children;
};

export class Permissions {
    static push(key) {
        _PERMISSIONS.push(key);
    }

    static insert(array) {
        array.forEach(it => _PERMISSIONS.push(it));
    }
}

class Guarded extends Component {

    constructor(props) {
        super(props);
        this.setState({
            guarded: false
        });
    }

    componentDidMount() {
        this.checkGaurd(this.props.permissions, this.props.oneOf);
    }

    componentWillReceiveProps(newProps) {
        this.checkGaurd(newProps.permissions, newProps.oneOf);
       
    }

    checkGaurd(permissions, oneOf) {
        let _guarded = false;
        if(permissions) {
            if(oneOf) {
                _guarded = this._oneOf(permissions);
            } else {
                _guarded = this._allOf(permissions);
            }
            this.setState({guarded: _guarded});
        }
    };

    _exist(key) {
        return _PERMISSIONS.filter(it => it === key).length > 0;
    };

    _allOf(array) {
        let existArray = array.map(it => this._exist(it));
        existArray = existArray.filter(it => it);
        return existArray.length === array.length;
    };

    _oneOf(array) {
        let existArray = array.map(it => this._exist(it));
        existArray = existArray.filter(it => it);
        return existArray.length > 0;
    };


    render() {
        const { Owner, children, oneOf, permissions, ...properties } = this.props;
        const { guarded } = this.state;
        return (
            <HAT>
                {guarded && <Owner {...properties} >
                    {children}
                </Owner>}
            </HAT>
        );
    }
}

export default Guarded;
