## Content Id

To get the content id of the video or image of the movie you want to add the metadata to, use the movie search function here [Movies](doc:upload-movies).

## Add Tag or Collection

To add a tag or collection to your image or video for your movie, first choose from the Tag or Collection drop-down whether you want to add a tag or collection. Then enter the content id of the asset you want to add, the content definition, and the name of the tag/collection. Then select if you want the tag or collection to be created or not under Create New. 

![](images/add-tag-or-collection.png)

If you are using an existing tag or collection select false under Create New. Then enter the tag id of the tag you wish to add.

![](images/add-tag-or-collection-2.png)

> 📘 Note
> 
> For more information about the API call used got to [Add Tag Or Collection](https://developer.nomad-cms.com/docs/add-tag-or-collection)

## Create Tag or Collection

To create a tag or collection, enter whether you want to create a tag or collection and the name of the tag/collection.

![](images/create-tag-or-collection.png)

> 📘 Note
> 
> For more information about the API call used go to [Create Tag or Collection.](https://developer.nomad-cms.com/docs/create-tag-or-collection)

## Gets a Tag or Collection

To get a tag or collection, enter whether you want to get a tag or collection, and the id of the tag/collection.

![](images/get-tag-or-collection.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Tag or Collection.](https://developer.nomad-cms.com/docs/get-tag-or-collection)

## Remove Tag or Collection

To remove a tag or collection from an asset, first enter whether you are removing a tag or collection. Then enter the content id, tag id, and the content definition of the tag or collection you want to remove.

![](images/remove-tag-or-collection.png)

> 📘 Note
> 
> For more information about the API call used got to [Remove Tag Or Collection](https://developer.nomad-cms.com/docs/remove-tag-or-collection)

## Delete Tag or Collection

To delete a tag or collection, first enter whether you are deleting a tag or collection. Then enter the tag id of the tag or collection you want to delete.

![](images/delete-tag-or-collection.png)

> 📘 Note
> 
> For more information about the API call used got to [Delete Tag Or Collection](https://developer.nomad-cms.com/docs/delete-tag-or-collection)

## Add Related Content

For this example we are going to add the image in our movie as the related content for the video in our movie. To do this, we are going to add the movie content id under Content Id and the image id under Related Content Id. Finally put asset for the Content Definition.

![](images/add-related-content.png)

> 📘 Note
> 
> For more information about the API calls used got to [Add Related Content](https://developer.nomad-cms.com/docs/add-related-content)

## Delete Related Content

To delete the related content made in the example above, enter the content id of the movie under Content Id, the video id under the Related Content Id, and asset under Content Definition.

![](images/delete-related-content.png)

> 📘 Note
> 
> For more information about the API calls used got to [Delete Related Content](https://developer.nomad-cms.com/docs/delete-related-content)

## Bulk Update

To update metadata in bulk enter the id(s) of the content(s) you want to update. Then add the collection id(s), the related content id(s), and/or the tag id(s) you want to update.

![](images/bulk-update.png)

> 📘 Note
> 
> For more information about the API call used go to [Bulk Update Metadata](https://developer.nomad-cms.com/docs/bulk-update-metadata) 