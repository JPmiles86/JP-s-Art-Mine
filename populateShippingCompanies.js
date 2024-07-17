const ShippingCompany = require('./models/ShippingCompany');

const shippingCompaniesData = [
  { shippingCompanyId: 1, companyName: 'FedEx', trackingUrlTemplate: 'https://www.fedex.com/apps/fedextrack/?tracknumbers={trackingNumber}' },
  { shippingCompanyId: 2, companyName: 'DHL', trackingUrlTemplate: 'https://www.dhl.com/en/express/tracking.html?AWB={trackingNumber}' },
  { shippingCompanyId: 3, companyName: 'UPS', trackingUrlTemplate: 'https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums={trackingNumber}' },
  { shippingCompanyId: 4, companyName: 'USPS', trackingUrlTemplate: 'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1={trackingNumber}' },
  { shippingCompanyId: 5, companyName: 'Canada Post', trackingUrlTemplate: 'https://www.canadapost-postescanada.ca/track-reperage/en#/resultList?searchFor={trackingNumber}' },
  { shippingCompanyId: 6, companyName: 'Royal Mail', trackingUrlTemplate: 'https://www.royalmail.com/track-your-item#/tracking-results/{trackingNumber}' },
  { shippingCompanyId: 7, companyName: 'Australia Post', trackingUrlTemplate: 'https://auspost.com.au/mypost/track/#/details/{trackingNumber}' },
  { shippingCompanyId: 8, companyName: 'Japan Post', trackingUrlTemplate: 'https://trackings.post.japanpost.jp/services/srv/search/direct?locale=en&reqCodeNo1={trackingNumber}' }
];

const populateShippingCompanies = async () => {
  for (const data of shippingCompaniesData) {
    try {
      const shippingCompany = await ShippingCompany.create(data);
      console.log(`Created shipping company: ${shippingCompany.companyName}`);
    } catch (err) {
      console.error(`Failed to create shipping company: ${err.message}`);
    }
  }
};

populateShippingCompanies();
