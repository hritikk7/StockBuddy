# The 1% Club React Native Assignment
### Description
   This assignment involves creating a React Native application using Real Time Finance API to fetch 
   stock data and implement various functionalities such as login, stock search, stock details, order management, and more.

### Screenshots and videos
(Screenshot of Splash Screen, Login Screen, Main Screen, Stock Details Screen, Orders Screen)


#### * Splash screen and login screen
https://github.com/hritikk7/onePercentClubApp/assets/54003516/5427e58c-6b2c-4987-aa42-6d0bd72bd37a

####  * when user inputs invalid email or password
<img src="https://github.com/hritikk7/onePercentClubApp/assets/54003516/b35b44d4-4bcd-4dc3-86d5-16ecb71db5af" alt="LoadingMainScreen" width="250" height="500" /> <br/>

####  * Loading State when fetching stocks
<img src="https://github.com/hritikk7/onePercentClubApp/assets/54003516/eede96aa-963f-42e1-b236-69ca71cb0216" alt="LoadingMainScreen" width="250" height="500" /> <br/>


####  * Main Screen
<img src="https://github.com/hritikk7/onePercentClubApp/assets/54003516/ec981ef7-7d38-4bec-8ffa-dc3afa6dfcce" alt="LoadingMainScreen" width="250" height="500" /> <br/>


####  * Longpress on stock card
https://github.com/hritikk7/onePercentClubApp/assets/54003516/fca046f2-cb97-4905-b6f9-5517edcc9196


####  * Pagination 
https://github.com/hritikk7/onePercentClubApp/assets/54003516/cdd6b59c-384f-4ff8-8faa-c4880273ed77


####  * Search button toggle on swipe up
https://github.com/hritikk7/onePercentClubApp/assets/54003516/3e2b120a-ba41-4582-856f-1bad379d0b7b


####  * Search for stocks 
https://github.com/hritikk7/onePercentClubApp/assets/54003516/f1979b17-7964-4940-9219-04fd5debbc14


####  * Stock Details page
<img src="https://github.com/hritikk7/onePercentClubApp/assets/54003516/84433a4d-9036-4f87-a35d-1128dec8202d" alt="LoadingMainScreen" width="250" height="500" /> <br/>

####  * Add to order and delete in order page
https://github.com/hritikk7/onePercentClubApp/assets/54003516/8f8004b7-1953-42dc-9799-6898c8ca1e6b

####  * Open Orders page confirmed state success state
<img src="https://github.com/hritikk7/onePercentClubApp/assets/54003516/96a7b2cd-0f5e-4130-af30-15dfa8a405a1" alt="LoadingMainScreen" width="250" height="500" /> 
<img src="https://github.com/hritikk7/onePercentClubApp/assets/54003516/67b63ee7-9657-4d7c-9c6b-f44ca49a7209" alt="LoadingMainScreen" width="250" height="500" /> 
<img src="https://github.com/hritikk7/onePercentClubApp/assets/54003516/3618ee07-e481-4075-b961-1f8570bba9c2" alt="LoadingMainScreen" width="250" height="500" /> 



### Features
+ Splash Screen: Standard Splash Screen Behavior
+ Login Screen: Standard login with email and password using Redux for global state management
+ Main Screen: Bottom sheet revealing search bar on swipe up, displaying stocks with pagination
+ Stock Cards: Displaying Stock Name, Stock Ticker, Stock Full Name, Stock Price, Price Change, and Stock Image
+ Stock Search: Search stocks based on user input
+ Stock Description: Showing description of the stock on long press
+ Stock Details Screen: Displaying basic stock details and option to add stock order
+ Orders Screen: Displaying list of added stocks with option to remove and swipe to buy functionality
+ Swipe to Buy: Placing order on swipe with success state notification

### API Used
+ Market Trend API: Used to fetch trending stocks with trend type as GAINER
+ Search API: Used to search stocks based on user input in the search field

### Installation
   Clone the repository: git clone <repository-url>
   Install dependencies: npm install
   Run the application: npm run android
### Usage
+ Login with valid credentials to access the main screen.
+ login credentials : email - Admin@asdf.com password - Admin
+ Swipe up to reveal the search bar and Search stocks.
+ Click on a stock card to view its details and add it to the order list.
+ Press on the delete button to delete a stock in the order list.
+ Swipe right on the swipe to buy slider in the order list to place an order.
