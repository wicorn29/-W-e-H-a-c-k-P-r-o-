# Creating Alerts

Prodigy X uses [sweetalert2](https://sweetalert2.github.io/) to create alerts.

## Inputs

Prodigy X comes with custom functions for creating inputs.

### String

The `InputTypes.string` function is used to ask the user for a string. It accepts a `value` parameter which is the text that will be shown to the user.

This returns a promise that resolves to the value the user entered as a string.

!!! example
    An example of how to use the `InputTypes.string` function. In this example, the user will receive a prompt to enter their name.

    ```ts linenums="1"
    await InputTypes.string("Please enter the name of the player.")
    ```

### Integer

The `InputTypes.integer` function is used to ask the user for an integer. The first parameter it accepts is a `value` this is the text that will be shown to the user. It also accepts `min` and `max` parameters which are the minimum and maximum values the user can enter. The minimum value defaults to `0` and the maximum value defaults to `Infinity`.

!!! example
    An example of how to use the `InputTypes.integer` function. In this example, the user will receive a prompt to enter their level.

    ```ts linenums="1"
    await InputTypes.integer("Please enter your level.")
    ```
    But in prodigy, the level has to be between 1 and 100. So this works better:
    
    ```ts linenums="1"
    await InputTypes.integer("Please enter your level.", 1, 100)
    ```

### Float

The `InputTypes.float` function is used to ask the user for a float. The first parameter it accepts is a `value` this is the text that will be shown to the user.

### Select

The `InputTypes.select` function is used to ask the user for a select. The first parameter it accepts is a `value` this is the text that will be shown to the user. The second parameter is an array of options.

## Response Alerts

The response alerts are used to show the user a message.

- **success**: A success message.
- **error**: An error message.
- **confirm**: A confirm message.

    !!! example
        An example of how to use the response alerts.

        ```ts linenums="1"
        success("You have successfully logged in.")
        ```

You can also use `customMessage`. This accepts the same parameters as sweetalert2's fire function.
If the `html` option is a JSX element it will be converted to an HTML object.