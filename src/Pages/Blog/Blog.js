import React from 'react';
import PrototypeInheritance from '../../Assets/Blog img/prototype-inheritance.jpg'

const Blog = () => {
    return (
        <div className='my-10'>

            <h1 className='text-3xl font-bold my-10 text-center text-orange-600'>Learn to crack interview</h1>


            <div className='w-3/4 mx-auto'>

                {/* question 1 */}
                <div className="collapse collapse-arrow font-medium text-left  border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title ">
                        <p><span>Question 1: </span>What are the different ways to manage a state in a React application?</p>
                    </div>
                    <div className="collapse-content border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <p className='p-5'>
                            <h1 className='text-xl text-center font-bold my-2'>Different ways to manage state in react:</h1>

                            <ol>
                                <li>
                                    <h3 className='text-base font-bold my-2'>React Component Props</h3>
                                    <p>This method is a very common and easy to mange state of the components. You have to pass the state via props. This is also known as prop drilling. It can be complicated for you sometimes. For example, your data is present in the grand parent state and you want to pass the data into the grandchild component. To do this, you have to pass data to child component at first and then the data will be passed to the grandchild component. It can be complicated more.</p>
                                </li>

                                <li>
                                    <h3 className='text-base font-bold my-2'>React Context</h3>
                                    <p>React context made easy to share states between multiple components. It is very easy to use and provides very clean code. It is very straight forward to use and has native support. </p>
                                </li>

                                <li>
                                    <h3 className='text-base font-bold my-2'>Redux state management</h3>
                                    <p>Redux is a separate library. It permits you to maintain a centralized store for your apps shared state. It also provides uni-directional data flow for the state. It is very popular than MobX, Relay + GraphQL, Jumpsuit etc.  </p>
                                </li>
                            </ol>

                        </p>

                    </div>
                </div>

                {/* question 2 */}
                <div className="collapse collapse-arrow font-medium text-left  border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title ">
                        <p><span>Question 2: </span>  How does prototypical inheritance work?</p>
                    </div>
                    <div className="collapse-content border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <h3 className='text-xl text-center font-bold my-4'>Prototype inheritance</h3>

                        <p>
                            Inheritance means the child component will get all methods and properties from the parent component. It is similar to the way of getting father wealth. However, in the prototype inheritance, an object will get other objects property or methods via prototype linkage. In the JavaScript, all objects inherit properties and methods from a prototype.
                        </p>

                        <h3 className='text-xl font-bold my-3'>Graphical representation</h3>

                        <img src={PrototypeInheritance} alt="prototype inheritance img" />

                        <p className='my-5'>You can see in the above picture that there is a prototype inheritance between a rabbit another create prototype object which is an animal. We will fixed the rabbits prototype object as an animal prototype object. There, we will keep all the values of rabbit for a purpose. The reason behind this task is that if rabbit properties are missing then JavaScript will automatically get it  from the animal prototype object.
                        </p>
                    </div>
                </div>

                {/* question 3 */}
                <div className="collapse collapse-arrow font-medium text-left border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title ">
                        <p><span>Question 3: </span>What is a unit test? Why should we write unit tests?</p>
                    </div>
                    <div className="collapse-content border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">

                        <h1 className='text-xl font-bold text-center my-3'>Unit testing</h1>

                        <p>Unit testing is a process of checking your functions to check whether your code is working perfectly or not. In a simple word, it is a process of finding bugs.</p>

                        <p className='text-xl font-bold my-3'>Importance of unit test:</p>

                        <p>The main goal of the unit test is reduce bugs especially that bugs which arises from integration. Sometimes we might think that everything is working fine locally. But after committing their code, they can see that another commit has broken the app. This type of testing helps to catch these problems before they become issues and when combined with automated continuous integration pipelines, can make sure that the daily build is always working properly. </p>

                        <p>We should write unit test because in this type of testing we test each functions individually and if we can find any bugs, then we can fix it easily.</p>
                    </div>
                </div>

                {/* question 4 */}
                <div className="collapse collapse-arrow font-medium text-left border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title ">
                        <p><span>Question 4: </span>  React vs. Angular vs. Vue?</p>
                    </div>
                    <div className="collapse-content border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <div className='p-5'>
                            <h3 className='text-xl font-bold my-3'>React</h3>
                            <p className='my-3'>
                                <ul>
                                    <li><span className='font-bold'>Type:</span> Open source JS library</li>
                                    <li><span className='font-bold'>Size:</span> 109.7KB production and 774 KB development</li>
                                    <li><span className='font-bold'>Easy to learn:</span> Moderate</li>
                                    <li><span className='font-bold'>Coding speed:</span> Normal</li>
                                    <li><span className='font-bold'>Documentation:</span> Yes</li>
                                    <li><span className='font-bold'>Startup time:</span> Quick</li>
                                    <li><span className='font-bold'>Complete web apps:</span> Needs to be integrated with many other tools</li>
                                    <li><span className='font-bold'>Data binding:</span> Uni-directional</li>
                                    <li><span className='font-bold'>Rendering:</span> Server side </li>
                                    <li><span className='font-bold'>Model:</span> Virtual</li>
                                    <li><span className='font-bold'>Code reusability:</span> No, only CSS</li>

                                </ul>
                            </p>
                        </div>
                        <div className='p-5'>
                            <h3 className='text-xl font-bold my-3'>Angular</h3>
                            <p className='my-3'>
                                <ul>
                                    <li><span className='font-bold'>Type:</span> Javascript framework</li>
                                    <li><span className='font-bold'>Size:</span> 167KB production and 1.2 MB development</li>
                                    <li><span className='font-bold'>Easy to learn:</span> Steep</li>
                                    <li><span className='font-bold'>Coding speed:</span> Slow</li>
                                    <li><span className='font-bold'>Documentation:</span> Yes</li>
                                    <li><span className='font-bold'>Startup time:</span> Longer due to its large codebase</li>
                                    <li><span className='font-bold'>Complete web apps:</span> Can be used on standalone basis</li>
                                    <li><span className='font-bold'>Data binding:</span> Bi-directional</li>
                                    <li><span className='font-bold'>Rendering:</span> Client side </li>
                                    <li><span className='font-bold'>Model:</span> MVC</li>
                                    <li><span className='font-bold'>Code reusability:</span> Yes</li>

                                </ul>
                            </p>
                        </div>

                        <div className='p-5'>
                            <h3 className='text-xl font-bold my-3'>Vue</h3>
                            <p className='my-3'>
                                <ul>
                                    <li><span className='font-bold'>Type:</span> Progressive JavaScript Framework</li>
                                    <li><span className='font-bold'>Size:</span> 30.7KB production and 279 KB development</li>
                                    <li><span className='font-bold'>Easy to learn:</span> Easy</li>
                                    <li><span className='font-bold'>Coding speed:</span> Fast</li>
                                    <li><span className='font-bold'>Documentation:</span> Yes</li>
                                    <li><span className='font-bold'>Startup time:</span> Quick</li>
                                    <li><span className='font-bold'>Complete web apps:</span> Requires third party tools</li>
                                    <li><span className='font-bold'>Data binding:</span> Bi-directional</li>
                                    <li><span className='font-bold'>Rendering:</span> Server side </li>
                                    <li><span className='font-bold'>Model:</span> Virtual</li>
                                    <li><span className='font-bold'>Code reusability:</span> Yes, HTML & CSS</li>

                                </ul>
                            </p>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default Blog;