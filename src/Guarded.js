import React, { Component } from 'react';

const HAT = (props) => {
    return props.children;
};

export class Permissions {
    static push(item) {
        var permissions = JSON.parse(localStorage.getItem('react_guarded_permissions'));
        permissions.push(item);
        localStorage.setItem('react_guarded_permissions', JSON.stringify(permissions));
    }

    static insert(array) {
        localStorage.setItem('react_guarded_permissions', JSON.stringify(array));
    }

    static get() {
        return JSON.parse(localStorage.getItem('react_guarded_permissions'));
    }
}

export class Role {
    static set(role) {
        localStorage.setItem('react_guarded_role', role);
    }

    static get() {
        return localStorage.getItem('react_guarded_role');
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
        this.checkRole(this.props.hasRole);
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
        return Permissions.get().filter(it => it === key).length > 0;
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
        return Role.get() === role;
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
