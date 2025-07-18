export const baseTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Quote {{number}}</title>
    <style>
        body { font-family: {{fontFamily}}, sans-serif; margin: {{padding}}px; color: #333; }
        .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .company-info h1 { margin: 0; color: {{primaryColor}}; }
        .quote-info { text-align: right; }
        .client-info { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: {{secondaryColor}}; font-weight: bold; color: {{tableTextColor}}; }
        .total-row { font-weight: bold; background-color: {{secondaryColor}}; color: {{tableTextColor}}; }
        .notes { margin-top: 20px; padding: 20px; background-color: {{secondaryColor}}; border-radius: 4px; color: {{tableTextColor}}; }
        .payment-info { margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid {{primaryColor}}; color: #333; }
        .validity { color: #dc2626; font-weight: bold; }
        .logo { max-height: 80px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-info">
            {{#if includeLogo}}
                <img src="{{logoB64}}" alt="Logo" class="logo">
            {{/if}}
            <h1>{{company.name}}</h1><br>
            {{#if company.description}}<strong>{{labels.description}}</strong> {{company.description}}<br>{{/if}}
            <p>{{company.address}}<br>
            {{company.city}}, {{company.postalCode}}<br>
            {{company.country}}<br>
            {{company.email}} | {{company.phone}}<br>
            {{#if company.legalId}}<strong>{{labels.legalId}}:</strong> {{company.legalId}}<br>{{/if}}
            {{#if company.VAT}}<strong>{{labels.VATId}}:</strong> {{company.VAT}}{{/if}}</p>
        </div>
        <div class="quote-info">
            <h2>{{labels.quote}}</h2>
            <p><strong>{{labels.quote}}:</strong> #{{number}}<br>
            <strong>{{labels.date}}</strong> {{date}}<br>
            <strong class="validity">{{labels.validUntil}}</strong> {{validUntil}}</p>
        </div>
    </div>
    <div class="client-info">
        <h3>{{labels.quoteFor}}</h3>
        <p>{{client.name}}<br>
        {{#if client.description}}<strong>{{labels.description}}</strong> {{client.description}}<br>{{/if}}
        {{client.address}}<br>
        {{client.city}}, {{client.postalCode}}<br>
        {{client.country}}<br>
        {{client.email}}</br>
        {{#if client.legalId}}<strong>{{labels.legalId}}:</strong> {{client.legalId}}<br>{{/if}}
        {{#if client.VAT}}<strong>{{labels.VATId}}:</strong> {{client.VAT}}{{/if}}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>{{labels.description}}</th>
                <th>{{labels.quantity}}</th>
                <th>{{labels.unitPrice}}</th>
                <th>{{labels.vatRate}}</th>
                <th>{{labels.total}}</th>
            </tr>
        </thead>
        <tbody>
            {{#each items}}
            <tr>
                <td>{{description}}</td>
                <td>{{quantity}}</td>
                <td>{{../currency}} {{unitPrice}}</td>
                <td>{{vatRate}}%</td>
                <td>{{../currency}} {{totalPrice}}</td>
            </tr>
            {{/each}}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4"><strong>{{labels.subtotal}}</strong></td>
                <td><strong>{{currency}} {{totalHT}}</strong></td>
            </tr>
            <tr>
                <td colspan="4"><strong>{{labels.vat}}</strong></td>
                <td><strong>{{currency}} {{totalVAT}}</strong></td>
            </tr>
            <tr class="total-row">
                <td colspan="4"><strong>{{labels.grandTotal}}</strong></td>
                <td><strong>{{currency}} {{totalTTC}}</strong></td>
            </tr>
        </tfoot>
    </table>
    
    {{#if paymentMethod}}
    <div class="payment-info">
        <strong>{{labels.paymentMethod}}</strong> {{paymentMethod}}<br>
        {{#if paymentDetails}}
        <strong>{{labels.paymentDetails}}</strong> {{{paymentDetails}}}
        {{/if}}
    </div>
    {{/if}}
    
    {{#if noteExists}}
    <div class="notes">
        <h4>{{labels.notes}}</h4>
        <p>{{{notes}}}</p>
    </div>
    {{/if}}
</body>
</html>
`;
