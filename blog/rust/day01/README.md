# A journey with Rust - Day 01 - First contact

## Installing Rust

As mentioned in the Rust documentation you can install it with the following command:

```sh
$ curl https://sh.rustup.rs -sSf | sh                                                                                                                  
```

Once **Rust** is installed it can be easily updated calling a specific command. But before you should source the environment.

```sh
$ source $HOME/.cargo/env
$ rustup update
```

This command is helpful if you want to keep in touch with the latest release done every one or two monthes.

## IDE

Since I'm already using JetBrain IDEs for Java, Scala, Python, Javascript and Swift the conclusion is trivial: lets use it for rust! Of course if
your are reluctant to use such IDE feel free to use [Vim](https://github.com/rust-lang/rust.vim), [Emacs](https://github.com/rust-lang/rust-mode), [Atom](https://atom.io/packages/language-rust) or
finally any editor supporting the [Rust Language Server](https://github.com/rust-lang-nursery/rls).

Links: [JetBrains Rust plugin](https://intellij-rust.github.io)

## Rust project management with Cargo

First a Rust project can be created and managed using `cargo`. Like `sbt`, `maven`, `gradle`, `yarn` or `swift` it's a project and a package manager.

Links: [Cargo Guide](http://doc.crates.io/guide.html)

### Creating a new project

```sh
$ cargo new <name> [--bin]
```

This command creates a new project named with the given name. Like `swift` package manager you can ask for binary or a library with the `--bin` switch.

This command creates a directory with the given **name**. If you want to to create it in the existing directory you should use **init** instead. Of course the name is not required otherwise the result is the same `new`.

```sh
$ cargo init [--bin]
```

For instance `cargo new hello` creates a project named **hello** containing
- a **Cargo.tmml** file
- a **src** directory and
- a **src/lib.rs** test file.


### Building a project or not

```rust
$ cargo build
```

Once this command is executed a **target** directory containing compiled material is created. If you only want a dry like compilation for code analysis without effective compilation use the `check` command.

```rust
$ cargo check
```

### Cleaning a project

```rust
$ cargo clean
```

Once this command is executed the **target** directory is removed.

### Ready for TDD?

Tests can be simply run using the `test` command.

```rust
$ cargo test
```

One project seems to provide an [automatic Rust test execution](https://lpil.uk/blog/automatically-running-rust-unit-tests/) but it's written in `Ruby`!

