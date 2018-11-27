pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 { 

    /// @notice Star structure
    struct Star { 
        string name; 
        string starStory;
        string ra;
        string dec;
        string mag;
    }

    // mapping of tokens to meta data
    mapping(uint256 => Star) public tokenIdToStarInfo;

    // mapping of tokens to sale prices 
    mapping(uint256 => uint256) public starsForSale;

    // mapping of used star coordinates
    mapping(string => bool) usedStarCoordinates;

    /// @notice creates new star and assigns ownership to sender to address
    /// @param _name name of star (meta-data)
    /// @param _starStory story attached to star (meta-data)
    /// @param _ra star coordinate (meta-data)
    /// @param _dec star coordinate (meta-data)
    /// @param _mag star coordinate (meta-data)
    /// @param _tokenId token Id of star
    function createStar(string _name, string _starStory, string _ra, string _dec, string _mag, uint256 _tokenId) public { 
        // verify unique token id
        require(checkUniqueTokenId(_tokenId), "A star with that token ID already exists");
        
        // create new star 
        Star memory newStar = Star(_name, _starStory, _ra, _dec, _mag);

        // concatinate coordinate values
        string memory combinedCoordinates = string(abi.encodePacked(_ra, _dec, _mag));
        
        // verify unique coordinates
        require(checkUniqueCoordinates(combinedCoordinates), "A star with those coordinates is already registered.");

        // map new star to tokenId
        tokenIdToStarInfo[_tokenId] = newStar;

        // set used star coordinates to true for concatinated coordinate
        usedStarCoordinates[combinedCoordinates] = true;

        // mint new star
        _mint(msg.sender, _tokenId);
    }

    /// @notice checks if the concactinated star coordinate value is unique
    /// @param _string concatinated star coordinates (meta-data)
    /// @return trueness of uniqueness of coordinates
    function checkUniqueCoordinates(string memory _string) private view returns (bool isUnique) {
        return  ( usedStarCoordinates[_string] != true);
    }

    /// @notice checks if the tokenId is unique
    /// @param _tokenId id of star token
    /// @return trueness of uniqueness of coordinates
    function checkUniqueTokenId(uint256 _tokenId) private view returns (bool isUnique) {
        // get star from mapping with matching tokenId
        Star memory _star = tokenIdToStarInfo[_tokenId];

        // check if star has the name property set
        return (bytes(_star.name).length == 0);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }
}