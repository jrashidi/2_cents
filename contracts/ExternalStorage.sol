pragma solidity^0.4.2;

import "./Ownable.sol";

contract ExternalStorage is Ownable {

  //Events for contracts

  //We are creating the data structure for a new user
  struct User {
    string name;
    string description;
    string picture;
    uint index;
  }

  //We are creating the data structure for a new article
  struct Article {
    string title;
    string body;
    string genre;
    string picture;
    uint likes;
    uint index;
  }

  //arrays where we will store the stuct of the users and articles
  User[] public users;
  Article[] public articles;
  uint userCounter;
  uint articleCounter;

  //mapping the owner of the user and the owner of the article
  mapping (address => uint) public UserIndexToOwner;
  mapping (address => uint) public ArticleIndexToOwner;

  function createUser(string _name, string _description, string _picture) public {
    //making sure that the owner only has one account
    /* require(UserIndexToOwner[msg.sender] == 0); */
    //setting array index for the new user
    userCounter++;
    users.push(User(_name, _description, _picture, userCounter));
    //mapping the new user to the sender
    UserIndexToOwner[msg.sender] = userCounter;
  }

  /* function createArticle(string _title, string _body, string _genre, string _picture) public {
    //initializing likes to 0
    uint _likes = 0;
    uint _index;
    if (ArticleIndexToOwner.length == 0) {
      _index = 0;
    } else {
      _index = ArticleIndexToOwner.length;
    }
    //setting array index for the new article
    uint id = articles.push(Article(_title, _body, _genre, _picture, _likes, _index));
    //mapping the new article to the sender
    ArticleIndexToOwner[_index] = msg.sender;
  } */

  function getUser(uint _UserId) public constant returns (string _name, string _description, string _picture, uint _index) {
    //get user from array and store it to memory
    User memory u = users[_UserId];
    //return the values of the user
    return(u.name, u.description, u.picture, u.index);
  }

  /* function editUser(uint _UserId, string _name, string _description, string _picture) public {
    //check to see that sender is ther user
    require(UserIndexToOwner[_UserId] == msg.sender);
    User u = users[_UserId];
    u.name = _name;
    u.description = _description;
    u.picture = _picture;
  }

  function deleteUser(uint _UserId) public{
    //check to see that sender is ther user
    require(UserIndexToOwner[_UserId] == msg.sender);
    //delete the user
    delete users[_UserId];
  }

  function getArticle(uint _ArticleId) public constant {
    Article memory a = articles[_ArticleId];
  }

  function editArticle(uint _ArticleId) public {
    Article memory a = articles[_ArticleId];
  }

  function deleteArticle(uint _ArticleId) public {
    Article memory a = articles[_ArticleId];
  } */

  //OnlyOwner Functions
  /* function numberOfUsers() public onlyOwner returns (uint number) {
    uint number = users.length;
    return number;
  }

  function numberofArticle() public onlyOwner returns (uint number) {
    uint number = articles.length;
    return number;
  } */

}
