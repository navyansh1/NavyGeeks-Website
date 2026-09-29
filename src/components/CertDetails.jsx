import React from 'react';

// Plain-text details for a certification (used in the modal and on /certifications/).
const CertDetails = ({ cert }) => {
    const dates = [
        cert.issued && `Issued: ${cert.issued}`,
        cert.validThrough && `Valid through: ${cert.validThrough}`,
        cert.expires && `Expires: ${cert.expires}`,
    ].filter(Boolean);

    return (
        <>
            {dates.length > 0 && <p>{dates.join(' · ')}</p>}
            {cert.summary && <p>{cert.summary}</p>}
            {cert.listTitle && <p>{cert.listTitle}</p>}
            {cert.list && (
                <ul className="list-disc list-inside text-gray-300">
                    {cert.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
            )}
            {cert.issuer && cert.issuer !== 'Amazon Web Services' && (
                <p className="mt-1 text-gray-400 text-sm">Issued by {cert.issuer}</p>
            )}
            {cert.validation && (
                <p className="mt-1 text-gray-400 text-sm break-all">Validation #: {cert.validation}</p>
            )}
        </>
    );
};

export default CertDetails;
