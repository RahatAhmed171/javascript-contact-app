# **Contact Manager App**

<P>This is a simple contact manager through which a user can: 

* Create a contact
* Search contacts by entering a word or number as an input 
* Update the number or name of a contact
* Delete a contact 

_____

 ## **Project Setup:**


### 1 . Installing the dependencies:

   > ` npm install replace-in-file`

   
### 2 . Running the server:
    
Go to project root folder, open up the terminal and type `node server.js` and hit enter.
___


## **Project design:**
 
 Class diagram of the Contact Manager App:

 ![Class-diagram-for-Contact-app-Lucidchart](https://user-images.githubusercontent.com/69518859/175786691-15ccec74-083b-4e5e-9e3f-4c6b5ff82051.png)


The current storage system for our Contact App is file system. It means we perform the CRUD operations with the help of local machine file system.
Any new contact storage system should implement the operations of our abstract class `"ContactStorage"`.

_____

## **How to use the App:**

The frontend of our Contact Manager hasnt been implemented yet. But you can perform CRUD operations on our system with Contact Managers Web API.

* Go to the project root folder and create the `index.html` file.
* Copy the code below

```javascript

<!DOCTYPE html>
<html lang = "en">
<head>
  <meta charset = "UTF-8">
  
  <title>Contact Manager</title>
</head>
<body>
    <h1>Interacting with Contact Manager with its API</h1>
<script>
 
  window.addEventListener('load',function(e){

    
    let options={
      method:'get'
    }
    let url="http://127.0.0.1:1234/search";
    // This endpoint shows all the contacts
    
    fetch(url,options
     
    ).then(function(response){
      return response.json()
    }).then(function(json){
      console.log(json)
    })
    .catch(error=>{
      console.log('Sorry, could not sent the request to the Epp')
    })

    })

</script>
</body>
</html>
```

When the pege loads, it will make the fetch request. The url mentioned above will return all of the contacts in array.

The response will look like this:
```javascript

{name: 'DUMMYCONTACT1', phone: '12345678', email: 'example@gmail.com'},

{name: 'DUMMYCONTACT2', phone: '99999', email: 'example@gmail.com'}

```
 > Note : Always send contact name in Uppercase format as an input. Otherwise some operations may not work.


 

## **Searching contact by name or phone:**

To search contacts by a name or phone we have to  sent the input to the server.
Since we are sending an imformation to server, we have to modify the `'options'` of the fetch request.

```javascript
 let url="http://127.0.0.1:1234/search";
 let options={
      method:'post',
      body: '{"keyword":"DUMMYCONTACT1"}',
            // search by name

            //'{"keyword":"99999"}'
            // search by phone
      
    }
```

If the given number or phone matches, it will return those contacts

```javascript
{name: 'DUMMYCONTACT1', phone: '12345678', email: 'example@gmail.com'},

```
or it will return an error message
```javascript
{error: 'Sorry, the system could not complete the operation'}
```
_____

## **Creating a contact:**

```javascript
let url="http://127.0.0.1:1234/create";
let options={
      method:'post',
      body: '{"name":"JOHN","phone":"78787878","email":"example@gmail.com"}',

    }

```
Put the required input as a value to `'name'` ,`'email'` and `'phone'` respectively

It will return a successful message if the contact is created

```javascript
{"success":"New contact has been created succesfully"}
```

If there is an existing contact with the same name or phone, it will return error
```javascript
{"error":"Sorry, the system could not complete the operation"}
```
______
## **Updating a contact:**

```javascript
let url="http://127.0.0.1:1234/update";
let options={
      method:'post',
      body: '{"previous_name":"DUMMYCONTACT1","new_name":"JOHN"}',
      // updates the name of a contact 
      // '{"previous_phone":"12345678","new_phone":"55555"}'
      //updates the phone number of a contact

    }

```

It will return a successful message if the contact is updated

```javascript
{"success":"The contact has been updated succesfully"}
```
if there is no such name or phone in contacts then
it will return error

```javascript
{"error":"Sorry, the system could not complete the operation"}
```
____

## **Delete a contact:**

```javascript
let url="http://127.0.0.1:1234/delete";
let options={
      method:'post',
      body: '{"contact_to_delete":"DUMMYCONTACT2"}',
      // put the name of the contact you want to delete

    }

```
If the contact is deleted successfully it will return
```javascript
{"success":"The contact has been deleted succesfully"}
```
If there is no such contact with the given name. it will return error

```javascript
{"error":"Sorry, the system could not complete the operation"}
```










 








