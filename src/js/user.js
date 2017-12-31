User = {
  web3Provider: null,
  contracts: {},
  account: 0x0,
  loading: false,

  init: function() {
    return User.initWeb3();
  },
  //
  initWeb3: function() {
    //initialize web3 and set the provider to testrpc
    if(web3 !== 'undefined') {
      User.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      //set the provider you want from web3.providers
      User.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(User.web3Provider);
    }
    return User.initContract()
  },

  initContract: function() {
    $.getJSON('ExternalStorage.json', function(userArtifacts) {
      //get the necessary contract artifact fileand use it to instantiate a trufle contract abstraction.
      User.contracts.ExternalStorage = TruffleContract(userArtifacts);
      //set the provider for our contract
      User.contracts.ExternalStorage.setProvider(User.web3Provider);
    });
  },

  findUser: function() {
    var id = document.getElementById('user-id').value;
    User.contracts.ExternalStorage.deployed().then(function(instance){
      return instance.getUser.call(id);
    }).then(function(user) {
      if (user == 0 ){
        console.log(user);
        return;
      } else {
        $('#returned-user-name').text(user[0]);
        $('#returned-user-description').text(user[1]);
        document.getElementById("returned-user-picture").src = user[2];
        $('returned-user-url').text(user[2]);
        $('#returned-user-index').text(user[3])
      };
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  createUser: function(_name, _description, _url) {
    var name = _name;
    var description = _description;
    var url = _url;
    User.contracts.ExternalStorage.deployed().then(function(instance){
      //create user from inputted information
      return instance.createUser(name, description, url);
    }).then(function(data) {
      console.log(data)
    }).catch(function(err) {
      console.log(err.message);
    });
   },


  //function that uploads images to IPFS
  ipfsUpload: function() {
    const reader = new FileReader();
    const photo = document.getElementById("photo");
    reader.readAsArrayBuffer(photo.files[0]);
    reader.onloadend = function() {
      // Connect to IPFS
      const ipfs = window.IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'})
      // Convert data into buffer
      const buf = buffer.Buffer(reader.result)
      // Upload buffer to IPFS
      ipfs.files.add(buf, (err, result) => {
        if(err) {
          console.error(err)
          return
        }
        console.log(result)
        var url = `https://ipfs.infura.io/ipfs/${result[0].hash}`
        var name = document.getElementById('user-name').value
        var description = document.getElementById('user-description').value;
        console.log(`Url --> ${url}`)
        User.createUser(name, description, url)
      })
    }
  },
}

$(function() {
  $(window).load(function() {
    User.init();
  });
});
