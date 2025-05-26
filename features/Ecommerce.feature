Feature: Ecommerce Validation

    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "gulshan@iomail.com" and "Test@12345"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 4" is displaying in the Cart
        When Enter valid details and place the order "gulshan@iomail.com"
        Then Verify order in present in the orderHistory



    # @Validation
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        # Then Verify Error message is displayed
        Examples:
            | username           | password |
            | rahulshettyacademy | learning |
            | rahulshettyacademy | learning |

            # npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
            # npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
            # npx cucumber-js --tags "@Regression" --retry 1 --exit --format html:cucumber-report.html
            