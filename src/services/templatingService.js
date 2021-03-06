/* globals module */

/**
 * @module baasicTemplatingService
 * @description Baasic Templating Service provides an easy way to consume Baasic Templating REST API end-points. In order to obtain a needed routes `baasicTemplatingService` uses `baasicTemplatingRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicTemplatingService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicTemplatingRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, templatingRouteService) {
            return {
                /**
                * Returns a promise that is resolved once the find action has been performed. Success response returns a list of template resources matching the given criteria.
                * @method        
                * @example 
baasicTemplatingService.find({
 pageNumber : 1,
 pageSize : 10,
 orderBy : '<field>',
 orderDirection : '<asc|desc>',
 search : '<search-phrase>'
})
.success(function (collection) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});    
                **/
                find: function (options) {
                    return baasicApiHttp.get(templatingRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the specified template resource.
                * @method        
                * @example 
baasicTemplatingService.get('<template-id>')
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                **/
                get: function (id, options) {
                    return baasicApiHttp.get(templatingRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                * Returns a promise that is resolved once the create template action has been performed; this action creates a new template resource.
                * @method        
                * @example 
baasicTemplatingService.create({
 content : '<content>',
 templateId : '<template-id>'
})
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                **/
                create: function (data) {
                    return baasicApiHttp.post(templatingRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                * Returns a promise that is resolved once the update template action has been performed; this action updates a template resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicTemplatingRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(template);
var uri = params['model'].links('put').href;
```
                * @method        
                * @example 
// template is a resource previously fetched using get action.
template.content = '<new-content>';
baasicTemplatingService.update(template)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
               **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                * Returns a promise that is resolved once the remove action has been performed. This action will remove a template resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicTemplatingRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(template);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// template is a resource previously fetched using get action.				 
baasicTemplatingService.remove(template)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                * Provides direct access to `baasicKeyValueRouteService`.
                * @method        
                * @example baasicTemplatingService.routeService.get.expand(expandObject);
                **/
                routeService: templatingRouteService,
                batch: {
                    /**
                    * Returns a promise that is resolved once the create action has been performed; this action creates new template resources.
                    * @method batch.create       
                    * @example 
   baasicTemplatingService.batch.create([{
      content : '<content>',
      templateId : '<template-id>'
    }])
    .success(function (data) {
      // perform success action here
    })
    .error(function (response, status, headers, config) {
      // perform error handling here
    });
                    **/
                    create: function (data) {
                        return baasicApiHttp.post(templatingRouteService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    }, 
                    /**
                    * Returns a promise that is resolved once the update action has been performed; this action updates specified template resources.
                    * @method batch.update       
                    * @example 
    baasicTemplatingService.batch.update(templates)
    .success(function (data) {
      // perform success action here
    })
    .error(function (response, status, headers, config) {
      // perform error handling here
    });
                    **/
                    update: function (data) {
                        return baasicApiHttp.post(templatingRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    },                                      
                    /**
                    * Returns a promise that is resolved once the remove action has been performed. This action will remove template resources from the system if successfully completed. 
                    * @method batch.remove       
                    * @example 			 
    baasicTemplatingService.batch.remove(companyIds)
    .success(function (data) {
      // perform success action here
    })
    .error(function (response, status, headers, config) {
      // perform error handling here
    });		
                    **/
                    remove: function (ids) {
                        return baasicApiHttp({
                            url: templatingRouteService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
                    }
                }
            };
        }]);
} (angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
