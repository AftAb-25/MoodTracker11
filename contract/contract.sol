// License (required)
 // SPDX-License-Identifier: MIT

// Solidity version
pragma solidity ^0.8.0;

// Smart Contract name
contract MoodTracker {

    // This variable stores the mood as text
    string public mood;

    // This function is used to save a mood
    function setMood(string memory _mood) public {
        mood = _mood;
    }

    // This function is used to read the mood
    function getMood() public view returns (string memory) {
        return mood;
    }
}


