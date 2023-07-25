//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract BattleForETH {
    address public immutable owner;
    Box[] public grid;
    Box[] public myBag;
    uint256[] public nums;

    struct Box {
        uint256 index;
        uint256 id;
        string typeGrid;
        string content;
        uint256 hp;
    }

    constructor(address _owner) {
        owner = _owner;

        uint256 id = 0;

        for (uint256 row = 0; row < 5; row++) {
            for (uint256 col = 0; col < 5; col++) {
                grid.push(Box(id, id, "empty", "-", 0));
                id++;
            }
        }

        myBag.push(Box(26, 26, "army", "0", 0));
        myBag.push(Box(27, 27, "army", "0", 0));
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function getGrid() public view returns (Box[] memory){
        return grid;
    }

    function getMyBags() public view returns (Box[] memory){
        return myBag;
    }

    function getNums() public view returns (uint256[] memory){
        return nums;
    }

    function placeFighter(uint256 index) public {
        grid[index].content = "0";
        grid[index].hp = 10;
        grid[index].typeGrid = "sword";
        myBag.pop();

        nums.push(index);
    }

    function movePlayer(uint256 oldIndex, uint256 newIndex) public {
        Box memory data1 = grid[oldIndex];
        Box memory data2 = grid[newIndex];
        grid[oldIndex] = data2;
        grid[newIndex] = data1;
        grid[oldIndex].index = data1.index;
        grid[oldIndex].id = data1.id;
        grid[newIndex].index = data2.index;
        grid[newIndex].id = data2.id;
    }

    function attack(uint256 attacker, uint256 target) public {
        require(grid[attacker].hp != 0);
        grid[target].hp -= 5;
        if (grid[target].hp <= 0) {
            grid[target].content = "-";
            grid[target].typeGrid = "empty";
            grid[target].hp = 0;
        }
    }

     function buyArmy() public {
        uint256 total = nums.length;

        myBag.push(Box(26 + total , 26 + total, "army", "O", 10));
    }

    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    receive() external payable {}
}