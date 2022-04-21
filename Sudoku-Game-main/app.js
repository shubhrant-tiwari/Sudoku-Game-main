      const easy = [
      "----57-2-----4-1--37--824--------7-55-------96-1--------296--43--5-2-----6-53----",
      "146357928258649137379182456423896715587413269691275384712968543835724691964531872",
      ];
      const med = [
      "--4-85-96-5--69---3-----2-8--7--8-----2---7-----4--5--7-1-----3---93--4-93-71-8--",
      "174285396258369471369147258417528639582693714693471582741852963825936147936714825",
      ];
      const hard = [
      "-82---7---9-2-6-4-3---8---5--3-----6-58--123-7----38--6---4---2-2-9-7-5---5---47-",
      "582134769197256348346789125213478596458691237769523814671345982824917653935862471",
      ];

      //  variables

      var initalSelected = false;
      var inputCell;
      var diff = easy[0];
      var solution = [""];
      var disableSelect;
      var selectedNum
      // declaring variable finshed

      // some useful functions
      function q(selector) {
      return document.querySelector(selector);
      }
      function qA(selector) {
      return document.querySelectorAll(selector);
      }
      function id(id) {
      return document.getElementById(id);
      }

      window.onload = function () {
      startSudoku();
      // 
     
      };
      // function keyp(){
      //    for(let i=0;i<id("number-container").children.length;i+++){
      //   id("number-container").children[i].addEventListener('click' , function(){
            
      //       if(!disableSelect){
              
      //         if(this.classList.contains("selected")){
      //           this.classList.remove("selected");
      //           selectedNum=null;

      //         }
      //         else{
      //           for(let i=0;i<9;i++){
      //             id("number-container")[i].classList.remove("selected");
      //           }
      //           this.class
      //         }
      //       }
      //   });
      // }
      

      // difficulty anaalysis
      function level(x) {
      if (x === 1) {
      window.diff = easy[0];
      } else if (x === 2) {
      window.diff = med[0];
      } else if (x === 3) {
      window.diff = hard[0];
      }
      startSudoku();
      }

      // updating

      function update(n) {
       inputCell.textContent=n;
       addToArray(n);      
        if (inputCell) {
      document.addEventListener(
        "keydown",
        (event) => {
          var name = event.key;
          if (name > 0 && name < 10) {
            inputCell.textContent = name;
            addToArray(name);
          } else if (name == 0) {
            inputCell.textContent = null;
            removeFromArray();
          }
        },
        false
      );
      }
      }

      // starting game

      function startSudoku() {
      let board;
      board = diff;
      setDiff(diff);
      gameBoard(board);
      }

      function clearPrevious() {
      //select all Cells
      let cells = qA(".cell");
      for (let i = 0; i < cells.length; i++) {
      cells[i].remove();
      }
      }
      function setDiff(str) {
      for (let i = 0; i < str.length; i++) {
      solution[i] = str[i];
      }
      }
      function addToArray(num) {
      let index = q(".selected").id;
      // id(index).classList.add("highlighted");
      solution.splice(index, 1, num);
      checks();
      }
      function removeFromArray() {
      let index = q(".selected").id;
      solution.splice(index, 1, "-");
      }

      function validate() {
      // checking sum of row and columns

      let l = 1;
      for (let i of solution) {
      let sum = 0;

      for (let i = 0; i < 9; i++) {
        if (solution != "-") sum += parseInt(solution[i]);
        for (let j = i + 9; j < 81; j += 9) {
          if (solution != "-") sum += parseInt(solution[j]);
        }
      }
      if (sum != 405) {
        l = 0;
      }
      if (l != 0) {
        checks();

        for (let i = 0; i < 81; i++) {
          if (id(i).classList.contains("wrong")) {
            l = 0;
            break;
          }
        }
      }
      //console.log(l);
      }
      if (l == 1) {
      endGame();
      return;
      } else {
      alert("Something is not right, Try again.");
      }
      }
      function endGame() {
      for (let i = 0; i < 81; i++) {
      id(i).classList.add("prefilled");
      }
      alert("You Win!, GGWP!");
      }
      function checks() {
      let col = parseInt(inputCell.id % 9);
      let row = parseInt(inputCell.id / 9);
      // let col = 3*Math.floor(row/3)+Math.floor
      // let row = parseInt(inputCell.id % 9);

      let s = inputCell.id;
      //console.log(col,row);
      for (let i = 0; i < 81; i++) {
      qA(".cell")[i].classList.remove("highlighted");
      }

      //vertically checking duplicates
      for (let i = col; i < col + 73; i += 9) {
      let ins = 1;
      if (i != s) {
        id(i).classList.add("highlighted");
      }
      for (let j = col; j < col + 73; j += 9) {
        if (i != j && solution[i] == solution[j]) {
          id(i).classList.add("wrong");
          id(j).classList.add("wrong");
          
          ins++;
        }
      }
      if (ins == 1) {
        for (let j = col; j < col + 73; j += 9) {
          if (solution[i] == solution[j]) {
            id(i).classList.remove("wrong");
            id(j).classList.remove("wrong");
            
          }
        }
      }
      }

      // horizontally checking duplicates
      for (let i = row * 9; i < row * 9 + 9; i++) {
      let ins = 1;
      if (i != s) {
        id(i).classList.add("highlighted");
      }
      for (let j = row * 9; j < row * 9 + 9; j++) {
        if (i != j && solution[i] == solution[j]) {
          id(i).classList.add("wrong");
          id(j).classList.add("wrong");

          ins++;
        }
      }
      if (ins == 1) {
        for (let j = row * 9; j < row * 9 + 9; j++) {
          if (solution[i] == solution[j]) {
            id(i).classList.remove("wrong");
          }
        }
      }
      }
      // checking sum of box1
      let x = 0;
      let y = 3;
      if ((-1 < s && s < 3) || (8 < s && s < 12) || (17 < s && s < 21)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      //checking sum of box2
      x = 3;
      y = 6;
      if ((2 < s && s < 6) || (11 < s && s < 15) || (20 < s && s < 24)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      //checking sum of box3
      x = 6;
      y = 9;
      if ((5 < s && s < 9) || (14 < s && s < 18) || (23 < s && s < 27)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      //checking sum of box4
      x = 27;
      y = 30;
      if ((26 < s && s < 30) || (35 < s && s < 39) || (44 < s && s < 48)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      //checking sum of box5
      x = 30;
      y = 33;
      if ((29 < s && s < 33) || (38 < s && s < 42) || (47 < s && s < 51)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      //checking sum of box6
      x = 33;
      y = 36;
      if ((32 < s && s < 36) || (41 < s && s < 45) || (50 < s && s < 54)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      //checking sum of box7
      x = 54;
      y = 57;
      if ((53 < s && s < 57) || (62 < s && s < 66) || (71 < s && s < 75)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      //checking sum of box8
      x = 57;
      y = 60;
      if ((56 < s && s < 60) || (65 < s && s < 69) || (74 < s && s < 78)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      //checking sum of box9
      x = 60;
      y = 63;
      if ((59 < s && s < 63) || (68 < s && s < 72) || (77 < s && s < 81)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            id(j).classList.add("highlighted");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                id(j).classList.add("wrong");
                id(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  id(j).classList.remove("wrong");
                  id(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
      }
      }

      function gameBoard(board) {
      clearPrevious();
      let idCell = 0;
      for (let i = 0; i < 81; i++) {
      let cell = document.createElement("p");
      if (board.charAt(i) != "-") {
        cell.textContent = board.charAt(i);
        cell.classList.add("prefilled");
        cell.setAttribute("id", "pro");
        // cell.style.color="pink";
        // cell.style.backgroundColor="red"
      } else {
        cell.addEventListener("click", function () {
          if (cell.classList.contains("selected")) {
            cell.classList.remove("selected");
            inputCell = null;
          } else {
            for (let i = 0; i < 81; i++) {
              qA(".cell")[i].classList.remove("selected");
            }
          }
          cell.classList.add("selected");
          inputCell = cell;
          update();
        });
      }
      cell.id = idCell;
      idCell++;
      cell.classList.add("cell");
      if ((cell.id > 17 && cell.id < 27) || (cell.id > 44 && cell.id < 54)) {
        cell.classList.add("bottomBorder");
      }
      if ((cell.id + 1) % 9 == 3 || (cell.id + 1) % 9 == 6) {
        cell.classList.add("rightBorder");
      }

      if ((cell.id + 1) % 9 == 0 || (cell.id + 1) % 9 == 0) {
        cell.classList.add("rightBorder");
      }

      if ((cell.id + 2) % 9 == 2 || (cell.id + 2) % 9 == 2) {
        cell.classList.add("leftBorder");
      }

      if (cell.id > 71 && cell.id < 81) {
        cell.classList.add("bottomBorder");
      }

      if (cell.id > -1 && cell.id < 9) {
        cell.classList.add("topBorder");
      }
      id("board").appendChild(cell);
      }
      }
