function initialize()
        {
            dices = 0; rolls = 0; mean = 0;mode = 0; median= 0;total=0; doubles=0; triples=0; records = [];
            modeArray = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0]];
            mean2 = document.getElementById("meanId"); median2 = document.getElementById("medianId"); mode2 = document.getElementById("modeId");
            doubles2 = document.getElementById("doublesId"); triples2 = document.getElementById("triplesId");
            table = document.getElementById("table");
        }
        function recordData()
        {
            dices = input.diceAmount.value; rolls = input.rollAmount.value; input.rollAmount.value = "";
        }
        function rollDice()
        {
            records = new Array(); let min = 1; let max = 6;
            for (i = 0;i<rolls;i++)
            {
                recordings = new Array(dices);
                tempTotal = 0;
                for (j=0;j<dices;j++)
                {
                    let num = parseInt(Math.random() * max);
                    (num==0) ? num=min: num++;
                    total += num;
                    tempTotal +=num;
                    recordings[j] = num;
                }
                records.push(tempTotal);
                addToMode(tempTotal);
                if (dices==2)
                 { if (recordings[0] == recordings[1]) { doubles++; } }
                if (dices==3) { if (recordings[0] == recordings[1] == recordings[2]) { triples++ } }
            }
            records.sort(); //sort all rolls
            mean = findMean(); median = findMedian(); mode = findMode(); //finds all information of rolls
            adjustRows();
            display();
        }
        function display()
        {
            mean2.innerHTML = mean;
            median2.innerHTML = median;
            mode2.innerHTML = mode;
            doubles2.innerHTML = doubles;
            triples2.innerHTML = triples;
        }
        function addToMode(num)
        {
            let number = modeArray[num-1][1];
            number++;
            modeArray[num-1][1] = number;
        }
        function findMean()
        {
            return Math.round(total/rolls); //make rounding better
        }
        function findMedian()
        {
            if (records.length % 2 == 1)
            {
                let num = parseInt(records.length /2);
                return records[num];
            }
            else
            {
                let num = (records.length/2);
                return (records[num-1] + records[num])/2;
            }
        }
        function findMode()
        {
            let min = 0; let modeValue = 0;
            for (i=0;i<modeArray.length;i++)
            {
                if (modeArray[i][1] > min)
                { min = modeArray[i][1]; modeValue = modeArray[i][0]; }
            }
            return modeValue;
        }
        function adjustRows()
        {
            let max = 6 * dices + 1;
            let rows = table.rows.length;
            if (rows < max)
            {
                temp = rows;
                for(i=temp;i<max;i++)
                {
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell();
                    var cell2 = newRow.insertCell();
                    cell2.id = i;
                    cell1.innerHTML = i;
                }
            }
            if (rows > max)
            {
                for(i=rows;i>max;i--)
                {
                    table.deleteRow(-1);
                }
            }
            recordFrequency();
        }
        function recordFrequency()
        {
            max = dices * 6;
            for (i = 1;i<=max;i++)
            {
                let temp = document.getElementById(i);
                temp.innerHTML = modeArray[i-1][1];
            }
        }