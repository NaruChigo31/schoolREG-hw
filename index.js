const authModule = require('./auth.js');
const student = require('./student.js');
// const readLine = require('readline')

// // const rl = readLine.createInterface({
// //     input: process.stdin,
// //     output: process.stdout
// // })

var studentUser
var teacherUser

const main = () => {
    if (!studentUser && !teacherUser){
        console.log('Авторизація: \n1: Я вчитель\n2: Я учень')
        authModule.rl.question('',(select)=>{
            switch(select){
                case '1':
                    authModule.authTeacher((teacher) => {
                        teacherUser = teacher
                        main()
                    })
                    break;
                case '2':
                    authModule.authStudent((student) => {
                        studentUser = student
                        main()
                    })
                    break;
            } 
        })
        
    } else if (teacherUser){
        console.log("--------------------------------------------------------------")
        console.log('You are teacher ')
        console.log(teacherUser.name, teacherUser.surname)
        console.log('Оберіть дію: \n1: переглянути список учнів\n2: поставити оцінку\n3: переглянути список оцінок\n0: вийти')
        authModule.rl.question("",(teachSelect) => {
            switch(teachSelect){
                case "1":
                    console.log("--------------------------------------------------------------")
                    let numb = 0
                    for (stud of student.students){
                        numb ++
                        console.log(`${numb} - ${stud.name} ${stud.surname}`)
                    }
                    console.log("--------------------------------------------------------------")
                    main()
                    break 
                case "2":
                    function addMark(callBack){
                        console.log("--------------------------------------------------------------")
                        console.log("Уведіть номер учня з списку учнів")
                        authModule.rl.question("", (studNumb) =>{
                            console.log(student.students[studNumb-1].name, student.students[studNumb-1].surname)
                            console.log("--------------------------------------------------------------")
                            console.log("Оберіть урок:\n1: Математика\n2: Українська мова\n3: Англійська мова\n4: Історія України")
                            console.log("--------------------------------------------------------------")
                            authModule.rl.question("",(lesson) =>{
                                if (parseInt(lesson) < 1 && Object.keys(student.students[studNumb-1].marks).length > 4 ){
                                    console.log("--------------------------------------------------------------")
                                    console.log("Немає уроку під цим номером")
                                    console.log("--------------------------------------------------------------")
                                } else{
                                    console.log("--------------------------------------------------------------")
                                    console.log(student.students[studNumb-1].name, student.students[studNumb-1].surname)
                                    console.log(Object.keys(student.students[studNumb-1].marks)[parseInt(lesson)-1])
                                    console.log("Уведіть оцінку:")
                                    authModule.rl.question("",(mark) => {
                                        Object.values(student.students[studNumb-1].marks)[parseInt(lesson)-1].push(mark)
                                        console.log(`${Object.keys(student.students[studNumb-1].marks)[parseInt(lesson)-1]}: ${Object.values(student.students[studNumb-1].marks)[parseInt(lesson)-1]}`)
                                        callBack()
                                    })
                                }
                                // main()
                            })
                        })
                        console.log("--------------------------------------------------------------")
                    }
                    addMark(main)
                    break
                case "3":
                    function seeMarks(callBack){
                        console.log("--------------------------------------------------------------")
                        console.log("Уведіть номер учня з списку учнів")
                        authModule.rl.question("", (studNumb) =>{
                            let numbMarks = 0
                            while (numbMarks < Object.keys(student.students[studNumb-1].marks).length){
                                console.log(`${Object.keys(student.students[studNumb-1].marks)[numbMarks]}: ${Object.values(student.students[studNumb-1].marks)[numbMarks]}`)
                                numbMarks++
                            }
                            callBack()
                        })
                    }
                    seeMarks(main)
                    break  
                case "0":
                    teacherUser = null
                    main() 
                    break         
            }
        })

    } else if (studentUser){
        console.log("--------------------------------------------------------------")
        console.log('You are student ')
        console.log(studentUser.name, studentUser.surname)
        console.log('Оберіть дію: \n1: переглянути список оцінок\n0: вийти')
        authModule.rl.question("",(studSelect) =>{
            switch(studSelect){
                case "1":
                    function seeMyMarks(callBack){
                        console.log("--------------------------------------------------------------")
                        console.log("Ваші оцінки:")
                        console.log("--------------------------------------------------------------")
                        let numbMarks = 0
                        while (numbMarks < Object.keys(studentUser.marks).length){
                            console.log(`${Object.keys(studentUser.marks)[numbMarks]}: ${Object.values(studentUser.marks)[numbMarks]}`)
                            numbMarks++
                        }      
                        callBack() 
                        console.log("--------------------------------------------------------------") 
                    }   
                    seeMyMarks(main)
                    break         
                case "0":     
                    studentUser = null
                    main()        
                    break
            }
        })
    }
}

main()
