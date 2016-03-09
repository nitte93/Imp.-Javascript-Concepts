/***********************************************\
 * Mozio JavaScript challenge
 * Browser support is irrelevant here, but any comments on specific
 * methods you use is a plus to show deeper understanding of the language
\***********************************************/

/**
 * Task 1: Write a function that repeats the String
 * with the following output:
 * 'Mozio'.repeatify(3); // 'MozioMozioMozio';
 */
 String.prototype.repeatString = function(){
      var outputString ="";
      //console.log(arguments[0]);
      var count = arguments[0];
      while(count >0){
          outputString +=this;
          count--;
      }
      //console.log(tempStr);
      return outputString;
 }
console.log('Mozio'.repeatString(3));

/****************************************************************************
    Task 1 :  For answer:  See the above updated code.
    My commeents: See below.
 ****************************************************************************/   
/**
*  Comments: Though, extending a native javascript object is not recommended, this was the best that I could come up with.
*  The other ways are.
*  Note: In all the cases our ways of passing inputs need to be tweaked, except the 1st one.
*  
*  1: By using Javascript's built-in String.prototype.repeat() method.
*      String.prototype.repeat is now ES6 Standard.
*      Something like: console.log('Mozio'.repeat(3));  
*
*   2: We can extend the String Object directly. 
*      Somthing like:
*
*      String.repeatString = function(){
*        var outputString ="";
*        //console.log(arguments[0]);
*        var count = arguments[0];
*        while(count >0){
*            outputString +=this;
*            count--;
*        }
*        //console.log(tempStr);
*        return outputString;  
*      }
*      limitations: But in this case, you need to create the string using the string constructor.
*      var str = new String("I was created using string constructor");
*
*   3: By creating a standalone function.
*      Something like:
*      function repeatString(inputString, repeatCount){
*          //logic
*      } 
*      Limitations: We need to pass string as an input.
*
*
* / You can find all these methods here: https://jsfiddle.net/nitte93/wzsxuske/4/
/*****************************************************************************/
 /*       Answer 1 ends here
/*****************************************************************************/


/**
 * Task 2: Refactor the following JavaScript to use just one eventListener
 * rather than binding invididual event listeners to each list element
 */

var list = document.querySelectorAll('.list li');
function logContent() {
    console.log(this.innerHTML);
}
/***********************************************
* Commenting the below loop to put my own logic.
************************************************/
// for (var i = 0; i < list.length; i++) {
//     list[i].addEventListener('click', logContent, false);
// }

//console.log(Object.prototype.toString.call(list));
   Array.prototype.forEach.call(list,function(curValue, index, arr){
          //console.log(curValue , index, arr);
          curValue.addEventListener('click', logContent, false);
   })   

/****************************************************************************
    Task 2 : For answer see above. Also, I've multiple answers for this question. Please see the comments below.
    My comments: Below
 ****************************************************************************   
/**
*  Ok, I must admit that I learnt a lot from this question. 
*  Initially, I tried this  
*  
*   list.forEach(function(curValue, index, arr){
*      curValue.addEventListener('click', logContent, false);
*    })
*
*  I was surprised it didn't work. Here, I learnt NodeList doesn't share Array.prototype.forEach.
*
*  Though I've given forEach method of adding the event listner, I still believe this is inefficient, and not much different from the initial code.
*  
*  Therefore, I suggest one more approach using, Dom Event Delegation.
*  
*  Since, the question stated that I could refractor the Javascript. This is what I would suggest.
*
*      var list = document.querySelector('.list');  // I modified the selector method
*
*          list.addEventListener("click", function(e) { // Putting addEventListener on the parent 
*              //console.log(e);
*              if (e.srcElement.nodeName === "LI") {    // Checking if the clicked item was one of the clild <li>s
*                 console.log(e.target.innerHTML);      // If yes? Output the child's innerhtml.
*              }
*
*          }, false);
*
*   You can see this working here: https://jsfiddle.net/nitte93/u3cp68uk/2/ 
*
*****************************************************************************
Answer 2 ends here
*****************************************************************************/

/**
 * Task 3: Inspect the output in the console from clicking an
 * item from ".list2", each index is the same
 * Explain why, and also fix the problem to log the correct index
 */
var list2 = document.querySelectorAll('.list2 li');
for (var i = 0; i < list2.length; i++) {
    list2[i].index = i;
    list2[i].addEventListener('click', function (e) {
      //console.log(e);
      console.log('My index:', e.target.index);
    }, false);
}

/****************************************************************************
    Task 3 : Answers
 ****************************************************************************   
/**
*  First, why?
*       Well, this is the classic example of Javascript the bad part, and this is what makes javascript good.
*       The problem is, the variable i, within the addEventListener callback function, is bound to the same variable i
*       outside of the function. In other words, it's holding the reference to i.
*       This is the classic example of problems while working with closures, where inner function hold the reference to the
*       outer function even when the outer function has already returned.
*  
* Fix: There're several  fixes for this.
*      The most elegent fix that I could come up with is, by exploiting the prototype concept of inheritence. 
*       
*        for (var i = 0; i < list2.length; i++) {
*          list2[i].index = i;
*          list2[i].addEventListener('click', function (e) {
*            //console.log(e);
*            console.log('My index:', e.target.index);
*          }, false);
*        }
*       
*  See it working here: https://jsfiddle.net/nitte93/mez0gkc0/5/
*****************************************************************************
Answer 4 ends here
*****************************************************************************/

/**
 * Task 4: Explain why the logs happen in the following order:
 * one, three, two
 */
(function () {
    console.log('one');
    setTimeout(function() {
      console.log('two');
    }, 0);
    console.log('three');
})();
/****************************************************************************
    Task 4 : Answer
 ****************************************************************************   
/**
*  Short Answer: Event Loop.
*
*  Long Answer: Still, Event Loop.
*  Well, to understand event loop, we need to understand these.
*   
*   Call Stack
*   Javascript Engine
*   Event Queue
*   Web Worker  
*   
*   Call Stack is the place where all our javascript code is executed. Simple code like runnig a for loop and calculating 2+2, 
*   is easily handeled by the javascript engine. When it comes to running complex code, like sending an Ajax request, setTimeout etc.
*   Call Stack sends these complex code to their respective Web APIs, also know as web workers.
*   Now, what are web workers? You ask.
*    Web workers sit inside your browsers and they provde a simple means for web content to run scripts in background threads. 
*    Once the web workers have done executing your complex code, It sends them back to the javascript engine.
*    Not to the call Stack, But to the mysterious event loop. Because, you don't want random people putting things to your call stack, 
*    that would mess up the whole flow of code execution.
*    Now, Once the call stack has done it's execution, and is empty, the content inside the event loop are pushed to the call stack.
*    and gets executed.   
*  
*   Let's see the code above and understand.
*   This is our call stack.
      
      console.log("one")  -> Simple, get's executed immediately
      setTimeout          -> Complex, sent to it's respective web worker ,leaving space for the nextline of code ot be executed
      console.log("three") ->Simple, executed immediately

      Webworker executes setTimeout and sends it back to the eventloop.
      Eventloop check if our call stack is empty.
      Yes it is.
      This is when it executes the console.log() inside the setTimeout call back.
      Hence, "two" is output last.
*****************************************************************************
Answer 4 ends here
*****************************************************************************/

/**
 * Task 5: Explain how "this" works in this particular scenario (how iPad is logged, followed by iPhone)
 */
var product = 'iPhone';
var obj = {
   product: 'iMac',
   prop: {
      product: 'iPad',
      getProductName: function() {
         return this.product;
      }
   }
};
console.log(obj.prop.getProductName());
var test = obj.prop.getProductName;
console.log(test());

//console.log(test.call(obj.prop));
/****************************************************************************
    Task 5 : Answer
 ****************************************************************************   
/**
*  When we called, obj.prop.getProductName(). Here, the 'this' keyword is refering to 'prop' object. Thus, it's outputs: iPad.
*
*  When we assigned, obj.prop.getProductName to test. Later when we called, test(). There is no way to identify the 'this' keyword.
*  Here, 'this' is pointing to the GLOABAL scope, It's same as doing console.log(this.product). And, since, in the GOLBAL scope we've an 
*  object named 'product'. console.log(this.product) outputs: iPhone. 
*  If you want to avoid this, we should explicetly pass the 'this' value, we can do something like. console.log(test.call(obj.proj)); 
*  Then the output would be: iPad. 
*
*  See this workin here: https://jsfiddle.net/nitte93/15zgakts/1/  
*****************************************************************************
Answer 5 ends here
*****************************************************************************/


/**
 * Task 6: Return the file extension or "false" if no extension
 */
function getFileExtension(file) {

  var arr = file.split('.');
  if(arr.length > 1){

      return arr[arr.length-1]
  }  
     return false;
}
console.log(getFileExtension('mozio.png'));
/****************************************************************************
    Task 6 : Answer: see above.
    My comments: See below.
 ****************************************************************************   
/* This can be achieved using several methods.
*   1) using indexOf method, and looping through each "."
*   2) using lastIndexOf method.
*   3) using regular expression.
*  
*   I still choose the split() method, cause it's simple and more understandable.
* See it working here: https://jsfiddle.net/nitte93/uLyy2doc/1/
*****************************************************************************
    Answer 6 ends here
*****************************************************************************/


/**
 * Task 7: Return the longest String in the Array
 */
function longestString(i) {
    var arr = i.sort(function(a, b) { 
    return b.length - a.length; 
    });
    return arr[0];
}
var longest = longestString([
  'coca-cola',
    'pepsi',
    'lemonade',
    'red bull'
]);
console.log(longest);
/****************************************************************************
    Task 7 : Answer: see above
 ****************************************************************************   
/**
* 
*  See this working here: https://jsfiddle.net/nitte93/gsk8yvsg/
*  
*****************************************************************************
    Answer 7 ends here
*****************************************************************************/

/**
 * Task 8: Sum all integers inside the nested Array
 */
function arraySum(i) {
    var flattnStr = i.toString()
    var flattenArr = flattnStr.split(',');
    var sum = flattenArr.reduce(function(prev, cur){
      return parseInt(prev, 10) + parseInt(cur,10);
    })
    return sum;
    // var flattenArr = i.reduce(function(prev, cur){
    //     return  Array.prototype.concat.call(prev,cur);
    // })
    //var flattenArr = Array.prototype.concat.apply([], i);
    //console.log(flattenArr);
    //var sum = flattenArr.reduce(function(prev, cur){
      //  return prev + cur;
    //})
    //return sum;
}
var added = arraySum([[3,2,88],4,5, [10, [1,6,1]], 1]);
console.log(added);
/****************************************************************************
    Task 8 : Answer : See above
 ****************************************************************************   
/** I've to admit that, this one got me thinking for sometime.
*   At first I though of using reduce(), but it only made me go for a nice walk.
*   And then, the elegant split() again came to my rescue.
*   I learnt, flattening the multilevel array is best done using split().
*   All this while i used to reduce concat them. Which is still good but only for 2-d arrays. 
*   Otherwise, if you still want to use reduce(), then recursion must be your friend.
*  
*  See it working here: https://jsfiddle.net/nitte93/u18dttjc/1/
*****************************************************************************
    Answer 8 ends here
*****************************************************************************/

/**
 * Task 9: Use the function below to write your own
 * Array.prototype.map equivalent to double each number
 */
var items = [1,5,8,2,6];
function map(collection, fn) {
  //console.log(collection.forEach(fn));
  //  return collection.map(fn);  
            var outputArr = [];

        for (var i = 0; i < collection.length; i++) {
            // Run the callback function over each element
            // to get the new value
            var newVal = fn(collection[i]);

            // Push the new value onto the new array
            outputArr.push(newVal);
        }

        return outputArr;

}
var mapped = map(items, function (item) {
    return item * 2;
});
console.log(mapped);

/****************************************************************************
    Task 9 : Answer : See above
 ****************************************************************************   
/** 
*  See it working here: https://jsfiddle.net/nitte93/p9v7d3rz/2/
*****************************************************************************
    Answer 9 ends here
*****************************************************************************/

/**
 * Task 10: Write a simple validation script for the above form
 * - If the required fields are not filled out, do not submit the form
 * - If the email is invalid, do not submit the form
 * - To validate the email, please call the validateEmail function
 * - The form should be able to have more fields added to it and 
     still work, without changing the JavaScript
   - The form doesn't need to post to a specific URL but please comment
     inside the code to demonstrate where this would happen
 */

function validateEmail(str) {
    var regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/;
  return regexp.test(str);
}

/****************************************************************************
    Task 10 : Answer : See above
 ****************************************************************************   
/** 
*  See it working here: https://plnkr.co/edit/qOiVRwaKR1gRKzOVPkrK?p=preview
*  To make this form post to specific url: change the action attribute of the form to your url.
*  and set the method attribut to (GET/POST).
*  Moreover, I would recommend, JQuery $.Ajax way of data posting: https://plnkr.co/edit/mCyxOf?p=preview 
*****************************************************************************
    Answer 10 ends here
*****************************************************************************/
