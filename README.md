# sp-boostrap-forms
A set of directives to work with Bootstrap forms and Angular js


## Available fields

### Currency

The default value for the currency can be set in the module configuration using the module provider using the ```setDefaults``` function. See example below:

```javascript
    spbootstrapFormsProvider.setDefaults({
        rootPath: 'sp-boostrap-forms/',
        currency: '£'
    });
```

```html
<abf-currency label="{{'activerecord.attributes.claim_item.cost' | translate}}" placeholder="" ng-model="vm.claimItem.cost" name="cost" ng-required="true"></abf-currency>
```
