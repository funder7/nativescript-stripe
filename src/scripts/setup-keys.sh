sed -i '' \
    -e 's/publishableKey = ""/publishableKey = "pk_test_s3dHtM9w6XmgB7ak7AbCSj51"/' \
    -e 's%backendBaseURL = ""%backendBaseURL = "https://rg-example-stripe-backend.herokuapp.com/"%' \
    -e 's/appleMerchantID = ""/appleMerchantID = "merchant.com.hearingclinic.hearingaids"/' \
    ../demo/app/demo/stripe.service.ts \
    ../demo-angular/app/demo/stripe.service.ts
