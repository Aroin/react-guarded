import React, { Component } from 'react';


let _PERMISSIONS = [];
let _ROLE = '';

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

    static get() {
        return _PERMISSIONS;
    }
}

export class ROLE {
    static set(role) {
        _ROLE = role;
    }

    static get() {
        return _ROLE;
    }
}

export class Guarded extends Component {

    componentWillMount() {
        this.setState({
            guarded: false,
            hasRole: false
        });
    }

    componentDidMount() {
        this.checkGaurd(this.props.permissions, this.props.oneOf);
    }

    componentWillReceiveProps(newProps) {
        this.checkGaurd(newProps.permissions, newProps.oneOf);
        this.checkRole(newProps.hasRole);
    }

    checkGaurd(permissions, oneOf) {
        let _guarded = false;
        if (permissions) {
            if (oneOf) {
                _guarded = this._oneOf(permissions);
            } else {
                _guarded = this._allOf(permissions);
            }
            this.setState({ guarded: _guarded });
        } else {
            this.setState({ guarded: true });
        }
    }

    checkRole(role) {
        if (role) {
            let existArray = role.map(it => this._hasRole(it));
            existArray = existArray.filter(it => it);
            this.setState({ hasRole: existArray.length > 0 });
        } else {
            this.setState({ hasRole: true });
        }
    }

    _exist(key) {
        return _PERMISSIONS.filter(it => it === key).length > 0;
    }

    _allOf(array) {
        let existArray = array.map(it => this._exist(it));
        existArray = existArray.filter(it => it);
        return existArray.length === array.length;
    }

    _oneOf(array) {
        let existArray = array.map(it => this._exist(it));
        existArray = existArray.filter(it => it);
        return existArray.length > 0;
    }

    _hasRole(role) {
        return _ROLE.filter(it => it === role).length > 0;
    }


    render() {
        const { Owner, children, oneOf, permissions, ...properties } = this.props;
        const { guarded, hasRole } = this.state;
        return (
            <HAT>
                {hasRole && guarded && Owner && <Owner {...properties} >
                    {children}
                </Owner>}
                {hasRole && guarded && !Owner && children}
            </HAT>
        );
    }
}
