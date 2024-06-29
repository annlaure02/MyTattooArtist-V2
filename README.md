# My Tattoo Artist V2
### 📌 Portfolio Project
The objective of this project is to bring together the greatest number of tattoo artists in France, for a person who wishes to be tattooed can find the tattoo artist who suits him and to put them in touch.  
## ![Capture d’écran 2024-06-29 à 23 10 47-fullpage](https://github.com/annlaure02/MyTattooArtist-V2/assets/113631115/6793cf4a-f053-4583-b3ec-8e300c103acb)


## 💻 Technologies used
### Backend
* Python
* Django
* Django REST Framework
* MySQL

### Frontend
* React
* HTML
* CSS
* Bootstrap

## 📝 Requirements
```
python@v3.8 or higher
mysql@v8.0.33 or higher
node@v18.16.0 or higher
npm@v9.5.1 or higher
```
## 🚀 Getting Started
Clone the repository
```
$ git clone https://github.com/annlaure02/MyTattooArtist
```
And go to the folder ``` my_tattoo_artist ```
```
$ cd my_tattoo_artist
```
### Installation and Setup Instructions
```
$ cd my_tattoo_artist
```
#### Backend
```
# Create environment and activate it
$ python3 -m venv env
$ . env/bin/activate

$ cd backend

# Install dependancies
$ pip install -r requirements.txt
*if python > 3.9 remove backports.zoneinfo in the requirements.txt*

# Create database migration files based on the changes you’ve made to your models. 
$ python3 manage.py makemigrations
$ python3 manage.py migrate

# Start the server
$ python3 manage.py runserver
```
#### Frontend
```
$ cd frontend

# Install dependancies
$ npm install

# Start the server
$ npm start
```
## ⚒ Features
### As a Tattoo Artist:
Create an acount  
Connects to his profile  
Add and update personnal information on his page  
### As a user:
Search an artist by his artist name, by the city, by the state, by tattoo style
Display the information sheet of an artist  
Display all artists available  
description of Tattoo Styles  

## 🖊 Authors
* Claudia Bura
* Anne-Laure Guilloux
