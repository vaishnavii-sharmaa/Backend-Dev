 const user = {name:"vaishnavi",email:"vaishnavisharma3321@gmail.com" , phone: 1234567890 , password:"satvik123"}; ;
// methods of object:

 const userName = user.name;
 const email = user.email;
  console.log(email);


 const {name ,email , phone} = user;
 console.log(name);
 console.log(email);
 console.log(phone);


// Object Reference:
 const user1={...user};
 const user2=user1;
 user1.name="vaishnavi";
 user2.name="Arsh"
 console.log(user);
 console.log(user1);


// Spread Operator:
 const updateUser = {...user , address:"mathura"}
 console.log(updateUser);

// hide pasword with rest operator  :
 const {password,...publicData} = user;
 console.log(publicData);

// Array Methods:
 const number = [1,2,3,4,5]; 

// array ke har element ko 2 se multiply karke naya array newNumber banata hai.
 const newNumber = number.map((num) => num * 2); 
 console.log(newNumber);

// array ke elements ka cumulative sum nikalta hai, lekin initial value 1 set hone ki wajah se result mein 1 add ho jayega. Short: array ke sab numbers ka sum + 1):
 const sumofNumber = number.reduce((sum , number) => sum + number, 1);
 console.log(sumofNumber);

// filter method : array ke elements me se even numbers ko filter karta hai aur naya array banata hai.
 const evenNumbers = number.filter((num) => num % 2 === 0);
 console.log(evenNumbers);



//check if array me koi number 3 se bada hai ya nahi. agar hai to true return karega, warna false.
const isGreaterThanThree = number.some((num) => num > 3);
console.log(isGreaterThanThree);



//check out every item is in stock or not:
const products = [
    {id:1 , name:"laptop" , price:50000 , inStock:true},
    {id:2 , name:"phone" , price:20000 , inStock:true},
    {id:3 , name:"tablet" , price:15000 , inStock:false},
];
const allInStock = products.every((product) => product.inStock);
console.log(allInStock);    


/*check karta h js pehla ki task asynchronous hai ya synchronous hai. 
agar synchronous hai to pehla ye task complete karega fir next task pe jayega. 
lekin agar asynchronous hai to ye task background me chala jayega aur next task pe chala jayega bina 
iske complete hone ka wait kiye.*/


console.log("fetching user data from db");
//let user;
setTimeout(() => {
    user = {name:"vaishnavi" , age:21 , email:"@gmail.com", phone:1234567890 , password:"satvik123" , address:"mathura"   };
    console.log("Settimeout task");
},0);
console.log("user data:",user);


//  Promises in JavaScript:

console.log("task1");
//let user;           
    setTimeout(() => {
        user = {name:"Satvik" , age:21 , email:"vaishnavisharma3321@gmail.com", phone:1234567890 , password:"satvik123" , address:"mathura"   };
        console.log("task2");
    },0);
   Promise.resolve().then(() => console.log("task3"));

// Creation of Promise:

 const fetchUser = (userId) => {
   return new Promise((resolve, reject) => {

    setTimeout(() => {
      const users = {
        1: {
          name: "vaishnavi",
          age: 21,
          email: "vaishnavisharma3321@gmail.com",
          phone: 1234567890,
          password: "vaishnavi123",
          address: "mathura"
        },
        2: {
          name: "Arsh",
          age: 22,
          email: "arsh.gaur12@gmail.com",
          phone: 9876543210,
          password: "arsh123",
          address: "mathura"
        }
      };

       const user = users[userId];

      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }

    }, 540);

  });
};


// Using the Promise:
/*
fetchUser(2)
  .then(user => {
    console.log("User fetched:", user);
  })
  .catch(err => {
    console.log("Error:", err);
  });
*/

// Async/Await in JavaScript:

const userData = async (userId) => {
    try{
        const user = await fetchUser(userId);
        console.log("User fetched:", user);
    }
    catch(err){
        console.log("Error:", err);
    }
}
userData(1);
userData(3);

// "https://jsonplaceholder.typicode.com/users"
// Fetch Data from API in JavaScript:
// const url = "https://jsonplaceholder.typicode.com/users";

using promise :

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log("User :", data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
  

// using async/await :

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");

    }
    const data = await response.json();
    console.log("User Data:", data);

  } catch (error){
    console.error("Fetch errors:",error);
  }

  }
fetchData();
