## Content Definitions

To run the code, you need to change the content definitions located at the top of the file. Replace that values to match the content definitions matching your environment.

![](https://files.readme.io/f936172-image.png)

## Adding a new movie

Enter the data for the fields you want to fill. Leave the field blank for fields you don't want added to your new movie. For the image and movie file, you can either upload your own file, or use one already saved in your assets.

![](https://files.readme.io/6fc025c-image.png)

> 📘 Note
> 
> For more information about the API calls used go to [Create Content](https://developer.nomad-cms.com/docs/create-content)

## Updating existing movie

You can update a movie by selecting update and entering the id of the movie you want to update in the Movie Id textbox that appeared below the selection. Then enter the information you want to update. Leave the information you want to keep intact blank.

![](https://files.readme.io/cfdaeb4-image.png)

> 📘 Note
> 
> For more information about the API calls used go to [Update Content](https://developer.nomad-cms.com/docs/update-content)

## Search Movies

To search for movies enter the search information below.

![](https://files.readme.io/af23e75-image.png)

When you click on add filters, you will see new text fields asking for the field name, operator, and value. If you want to remove the filter, click remove filter. You can add as many filters as you want.

![](https://files.readme.io/032c5fc-image.png)

When you click on add sort field, you will see new text fields asking for the field name and sort type. If you want to remove the sort field, click remove sort field. You can add as many sort fields as you want.

![](https://files.readme.io/000c05d-image.png)

> 📘 Note
> 
> For more information about the API calls used go to [Search](https://developer.nomad-cms.com/docs/search-api)

## Get Movie By Id

If you want to get a movie by id, add a filter under Filters in Search Movies. Then enter masterId under the Field Name, Equals under the Operator, and the id of the movie you want to search for under Value.

![](https://files.readme.io/23ba743-image.png)

> 📘 Note
> 
> For more information about the API call used got to [Get Content](https://developer.nomad-cms.com/docs/get-content)

## Delete Movie

To delete a movie, enter the movie id of the movie you want to delete under Movie Id and click submit.

![](https://files.readme.io/c670e86-image.png)

> 📘 Note
> 
> For more information about the API call used got to [Delete Content](https://developer.nomad-cms.com/docs/delete-content)