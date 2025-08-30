// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GuessQuest {
    // State variables
    uint256 public totalPlayers;
    mapping(address => uint256) public playerHighscores;
    mapping(address => bool) public isRegistered;

    // Events
    event PlayerRegistered(address indexed player);
    event HighscoreUpdated(address indexed player, uint256 oldScore, uint256 newScore);

    // Register a new player
    function registerPlayer() external {
        require(!isRegistered[msg.sender], "Player already registered");

        isRegistered[msg.sender] = true;
        totalPlayers++;
        playerHighscores[msg.sender] = 0;

        emit PlayerRegistered(msg.sender);
    }

    // Update player's highscore
    function updateHighscore(uint256 newScore) external {
        require(isRegistered[msg.sender], "Player not registered");

        uint256 oldScore = playerHighscores[msg.sender];
        require(newScore > oldScore, "New score must be higher than current highscore");

        playerHighscores[msg.sender] = newScore;

        emit HighscoreUpdated(msg.sender, oldScore, newScore);
    }

    // Get player's highscore
    function getPlayerHighscore(address player) external view returns (uint256) {
        return playerHighscores[player];
    }

    // Get current player's highscore
    function getMyHighscore() external view returns (uint256) {
        return playerHighscores[msg.sender];
    }

    // Check if player is registered
    function isPlayerRegistered(address player) external view returns (bool) {
        return isRegistered[player];
    }

    // Get total number of registered players
    function getTotalPlayers() external view returns (uint256) {
        return totalPlayers;
    }
}