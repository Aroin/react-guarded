# react-guarded
Simple Guard component for react js.


[![NPM](https://nodei.co/npm/react-guarded.png?downloads=true&stars=true)](https://nodei.co/npm/react-guarded/)


## Installation:

Install eact-guarded via `npm`

````shell
npm install react-guarded --save
````

## Integration

```js
// index.js
import {Permissions} from 'react-guarded';


Permissions.insert(['ADD', 'UPDATE']);
// Set permissions for current user

// app.component.js
import {Guarded} from 'react-guarded';


<Guarded permissions={['UPDATE']} > click update ...</Guarded>
```

#### Properties (optional)
**`permissions`** - [**`?string[]`**] 

Permissions array for Guarded section in application. 
```
 <Guarded permissions={['UPDATE', 'MODIFY']} > click update ...</Guarded>
```
**`Owner`** - [**`?any - React Component`**] 

Guarded parent component.

Permissions array for Guarded section in application. 
```
 <Guarded Owner={MyComponent} componentprop1={'balabala'} componentprop2={'balabala'} permissions={['UPDATE', 'MODIFY']} > click update ...</Guarded>
```

**`oneOf`** - [**`?boolean`**] 

If oneOf properties are enabled, the existence of one of the permissions list is sufficient.

```
 <Guarded oneOf permissions={['UPDATE', 'MODIFY']} > click update ...</Guarded>
```


## Supported

If you have ideas for more “How To” recipes that should be on this page, [Issues](https://github.com/aroin/react-guarded/issues) 
