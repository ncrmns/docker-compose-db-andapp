USE auctiondb;
CREATE TABLE auctions (
  id INT(4) AUTO_INCREMENT,
  title VARCHAR(25) NOT NULL,
  highestBid INT(8) NOT NULL,
  expiryDate INT(15) NOT NULL,
  highestBidderName VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
);

  INSERT INTO auctions (title,highestBid,expiryDate,highestBidderName) 
  VALUES ('expensive stuff',1234, 1565568000, 'Nathalie');
  