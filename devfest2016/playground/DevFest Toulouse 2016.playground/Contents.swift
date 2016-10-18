//: Playground - noun: a place where people can play

import Foundation

func annéeCourante() -> Int {
    return NSCalendar.currentCalendar()
        .components([.Year], fromDate: NSDate())
        .year
}

class Personne {
    let nom : String
    var age : Int
    
    init(nom:String, age: Int) {
        self.nom = nom
        self.age = age
    }
    
    convenience init(_ nom:String, année: Int) {
        self.init(nom:nom, age:annéeCourante() - année)
    }
}

var personne = Personne("John Doe", année:1944)
personne.age