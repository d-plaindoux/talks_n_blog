#[cfg(test)]
mod basic_i8 {
    fn adder(a: i8,b: i8) -> i8 {
        a + b
    }

    #[test]
    fn it_adds() {
        assert_eq!(adder(2,2), 4);
    }
}

#[cfg(test)]
mod basic_i16 {
    fn adder(a: i16,b: i16) -> i16 {
        a + b
    }

    #[test]
    fn it_adds() {
        assert_eq!(adder(2,2), 4);
    }
}

#[cfg(test)]
mod basic_i32 {
    fn adder(a: i32,b: i32) -> i32 {
        a + b
    }

    #[test]
    fn it_adds() {
        assert_eq!(adder(2,2), 4);
    }
}

#[cfg(test)]
mod basic_string {

    //
    // Let's be naive
    //

    fn concat1<'a>(mut a: String, b: String) -> String {
        a.push_str(&b);
        a
    }

    #[test]
    fn it_concats_1() {
        let a = String::from("2");
        let b = String::from("2");
        let c = String::from("22");

        assert_eq!(concat1(a,b), c);
    }

    //
    // Let's be less naive - Pass a reference for b
    //

    fn concat2<'a>(mut a: String, b: &String) -> String {
        a.push_str(b);
        a
    }

    #[test]
    fn it_concats_2() {
        let a = String::from("2");
        let b = String::from("2");
        let c = String::from("22");

        assert_eq!(concat2(a,&b), c);
        // assert_eq!(&a, &c) -- [Borrowing] 'a' is already used and moved in the previous concat
    }

    //
    // Let's be less and less naive - Generalize reference
    //

    fn concat3<'a>(a: &'a mut String, b: &String) -> &'a String {
        a.push_str(b);
        a
    }

    #[test]
    fn it_concats_3() {
        let mut a = String::from("2");
        let b = String::from("2");
        let c = String::from("22");

        assert_eq!(concat3(&mut a,&b), &c);
        assert_eq!(&a, &c);
    }

}
