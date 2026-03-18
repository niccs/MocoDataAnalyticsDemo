import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

const pool = new Pool({
  user: "moco_user",
  host: "localhost",
  database: "moco_analytics",
  password: "moco_password",
  port: 5432,
});

// ── menu data ─────────────────────────────────────────────────────────────────

const MENU_ITEMS_ALL = [
  { name: "Meat tasting platter", price: "$60", description: "250g sirloin cooked medium with chicken wings, lamb kebab, grilled chicken, kransky sausage, corn on the cob, zucchini, red onion, sweet potato with chimichurri dipping sauce & paradise homemade tomato relish.", category: "Sides" },
  { name: "Smashed avocado & fetta", price: "$11", description: "Smashed avocado & fetta on sourdough toast", category: "Mains" },
  { name: "Mushroom benny on sourdough", price: "$16", description: "Sourdough with sautéed mushrooms, spinach, poached eggs, burnt mushrooms, spring onion & hollandaise sauce", category: "Mains" },
  { name: "Three chocolate tasting plate", price: "$17", description: "Chocolate mousse tart, milk chocolate yuzu & baked white chocolate coconut flavoured cheesecake.", category: "Desserts" },
  { name: "Rashers of bacon (2)", price: "$7", description: "", category: "Sides" },
  { name: "Charcuterie board", price: "$40", description: "Selection of cured meats, cheddar, camembert & blue cheese, fig paste, pickled cucumbers, olives, cashews & walnuts, assorted fresh fruits, with grissini, lavash & toasted turkish bread.", category: "Sides" },
  { name: "Kids cheeseburger & chips", price: "$12", description: "Beef patty, cheddar cheese & tomato sauce served with chips or veggie sticks.", category: "Kids" },
  { name: "Grilled barbeque chicken", price: "$36", description: "Spiced, marinated & roasted boneless chicken thigh with vegetable kebab of corn, zucchini & onion. served with a salsa verde sauce.", category: "Mains" },
  { name: "Eggs (2); scrambled, fried or poached (hard or soft)", price: "$7", description: "", category: "Sides" },
  { name: "Grilled prawn skewer", price: "$8", description: "", category: "Sides" },
  { name: "Greek salad", price: "$19", description: "Mesclun salad, cucumber, cherry tomatoes, red onion, greek fetta, olives with tzatziki dressing.", category: "Salads" },
  { name: "Fried egg", price: "$4", description: "", category: "Sides" },
  { name: "Sirloin", price: "$42", description: "300g – grass fed beef sirloin", category: "Mains" },
  { name: "Bacon and eggs (breakfast, made to order)", price: "$7", description: "Cooked bacon and eggs, available from the made to order menu.", category: "Entrees" },
  { name: "Grilled chicken with rice and veggies (kids)", price: "$12", description: "Grilled chicken served with rice and vegetables, from the kids menu.", category: "Kids" },
  { name: "Crudité", price: "$28", description: "Fresh cucumber, carrots, celery sticks, cherry tomatoes, edamame beans, pickled cucumber, olives, yellow capsicum, snow peas served with tzatziki, hummus & beetroot dips.", category: "Sides" },
  { name: "Vegetarian fried rice omelette", price: "$16", description: "Fried rice with vegetables served in a folded omelette", category: "Mains" },
  { name: "Poached eggs & avocado", price: "$16", description: "Soft poached eggs, smashed avocado, fetta, beetroot, tomato & sourdough toast, served with sourdough", category: "Mains" },
  { name: "Kids pasta bolognese", price: "$12", description: "Beef mince in rich tomato & herb sauce with parmesan cheese. served with spaghetti or gluten free penne pasta.", category: "Kids" },
  { name: "Onion rings", price: "$11", description: "", category: "Sides" },
  { name: "Steamed vegetables", price: "$10", description: "", category: "Sides" },
  { name: "The aussie burger", price: "$27", description: "Chargrilled wagyu beef patty on a buttered milk bun, cheddar cheese, red onion, pickle, beetroot, spiced tomato chutney. served with chips.", category: "Mains" },
  { name: "Cheesy garlic loaf", price: "$14", description: "Garlic buttered loaf baked with cheese.", category: "Appetizers" },
  { name: "Sweet potato wedges", price: "$14", description: "", category: "Sides" },
  { name: "Ice cream party cake 1.5l", price: "$28", description: "Vanilla, chocolate & strawberry flavours with lollies.", category: "Desserts" },
  { name: "Sticky date pudding", price: "$14", description: "Warm sticky date pudding topped with a butterscotch sauce. served with whipped cream.", category: "Desserts" },
  { name: "Sweet & spicy slaw bowl", price: "$20", description: "Grilled halloumi with smoked paprika served with slaw of cabbage, carrots, mint & coriander. tossed with a sweet & spicy nam jim dressing.", category: "Salads" },
  { name: "Eggs benedict", price: "$16", description: "Toasted english muffin with soft poached eggs, spinach & hollandaise sauce. served with your choice of ham, bacon, or smoked salmon", category: "Mains" },
  { name: "Haloumi (2)", price: "$7", description: "", category: "Sides" },
  { name: "Steamed rice", price: "$7", description: "", category: "Sides" },
  { name: "Mash potato", price: "$10", description: "", category: "Sides" },
  { name: "Pork belly", price: "$36", description: "Crispy pork belly, mustard mash, steamed broccolini served with apple cider jus.", category: "Mains" },
  { name: "Grilled fish", price: "$36", description: "200g of your choice – salmon or barramundi", category: "Mains" },
  { name: "Hot & cold seafood platter", price: "$55", description: "Smoked salmon, natural oysters & green lip mussels, fresh prawns, crumbed prawns, battered scallop, calamari & battered flathead. served with chips.", category: "Sides" },
  { name: "Chicken schnitzel", price: "$27", description: "Crumbed chicken & gravy. served with chips & salad.", category: "Mains" },
  { name: "Rib on the bone", price: "$46", description: "350g – grass fed rib on the bone", category: "Mains" },
  { name: "Scotch fillet", price: "$44", description: "300g – 20 day grain fed darling downs scotch fillet", category: "Mains" },
  { name: "Strawberry & meringue", price: "$12", description: "Fresh strawberry, whipped cream and meringue", category: "Desserts" },
  { name: "Chicken wings", price: "$16", description: "Chicken caramelised in honey & soy sauce.", category: "Appetizers" },
  { name: "Kids sausages", price: "$12", description: "Mini beef sausages with mash potato, gravy & broccolini.", category: "Kids" },
  { name: "Baked beans", price: "$7", description: "", category: "Sides" },
  { name: "Hash brown (2)", price: "$7", description: "", category: "Sides" },
  { name: "Kids bento box", price: "$12", description: "Bento style box with penguin rice & seaweed with carrot & cucumber sticks, hummus, seasonal fruit pieces, hard boiled egg, tomato, jelly, ham, cheese & biscuits.", category: "Kids" },
  { name: "Mango & coconut pebble", price: "$15", description: "Mango mousse, tropical compote topped with coconut mousse ball.", category: "Desserts" },
  { name: "Bacon & eggs", price: "$11", description: "2 eggs to your liking, served with grilled bacon", category: "Mains" },
  { name: "Bruschetta", price: "$15", description: "Toasted sourdough with greek fetta, cherry tomatoes, red onion, fresh basil, extra virgin olive oil & balsamic glaze.", category: "Appetizers" },
  { name: "Paradise omelette", price: "$16", description: "Mozzarella, tomato, spinach & mushrooms with your choice of ham, bacon or smoked salmon", category: "Mains" },
  { name: "New york cheesecake", price: "$14", description: "Baked wild berry cheesecake served with berry coulis & whipped cream.", category: "Desserts" },
  { name: "Cheese platter", price: "$24", description: "Camembert, aged cheddar & blue cheese. served with fig paste, lavash & toasted turkish bread.", category: "Desserts" },
  { name: "Breaky wrap", price: "$16", description: "Toasted flour tortilla filled with bacon, scrambled eggs, spinach, tomato, mozzarella & wild bush chutney", category: "Mains" },
  { name: "Chicken parmigiana", price: "$29", description: "Crumbed chicken with leg ham, napoli sauce & grated mozzarella. served with chips & salad.", category: "Mains" },
  { name: "Vegetarian medley", price: "$20", description: "Veggie dim sim, samosa & vegetable kebab of corn, zucchini & onion.", category: "Appetizers" },
  { name: "Slow cooked beef curry", price: "$35", description: "Braised beef, thai spices, peanut, coconut milk, potatoes, carrots, served with a side of steamed jasmine rice.", category: "Mains" },
  { name: "Pancakes or waffles", price: "$11", description: "Served with strawberries & icing sugar. with your choice of maple syrup, chocolate or strawberry sauce.", category: "Desserts" },
  { name: "Fish & chips", price: "$26", description: "Battered flathead with tartare sauce & lemon. served with chips.", category: "Mains" },
  { name: "Grilled eggplant lasagna", price: "$28", description: "Eggplant, mushroom, napoli, mozzarella & parmesan.", category: "Mains" },
  { name: "Cheesy omelette", price: "$11", description: "2 egg omelette with cheese & a hash brown", category: "Mains" },
  { name: "Caesar salad", price: "$21", description: "Baby cos lettuce, bacon, hard boiled egg, garlic croutons, parmesan cheese with traditional caesar dressing.", category: "Salads" },
  { name: "Vanilla sundae", price: "$7", description: "Served with your choice of one topping & one syrup.", category: "Desserts" },
  { name: "Penguins big breakfast", price: "$16", description: "2 eggs cooked to your liking with bacon, sausages, mushrooms, hash brown & baked beans", category: "Mains" },
  { name: "Miso glazed salmon", price: "$36", description: "Oven baked salmon coated with white miso paste and maple sauce served with udon noodle salad in sesame dressing.", category: "Mains" },
  { name: "Kids nuggets & chips", price: "$12", description: "Chicken nuggets served with chips or veggie sticks.", category: "Kids" },
  { name: "Pasta bolognese", price: "$21", description: "Beef mince in rich tomato, red wine & herb sauce with parmesan cheese. served with spaghetti or gluten free penne pasta.", category: "Mains" },
  { name: "Thai style chicken cashew stir fry", price: "$28", description: "Asian vegetables, tofu, roasted cashews & chicken in a thai style sauce with a side of steamed rice.", category: "Mains" },
  { name: "Focaccia with italian dip", price: "$15", description: "Focaccia bread served with olive oil, balsamic vinaigrette, crushed garlic, dried italian herbs & parmesan.", category: "Appetizers" },
  { name: "Garlic prawns fettuccine", price: "$24", description: "Sautéed prawns in a white wine & garlic cream sauce served with fettuccine pasta.", category: "Mains" },
  { name: "Thai beef salad", price: "$28", description: "Mesclun salad, cucumber, cherry tomato, onion, toasted cashew & nut, coriander & grilled beef with tangy lime & chilli dressing.", category: "Salads" },
  { name: "Pork cutlet", price: "$38", description: "300g – king rib barker creek cutlet", category: "Mains" },
  { name: "Bowl of chips", price: "$10", description: "", category: "Sides" },
  { name: "Kids fish & chips", price: "$12", description: "Battered flathead & tartare sauce served with chips or veggie sticks.", category: "Kids" },
  { name: "Small garden salad", price: "$8", description: "Lettuce, tomato, cucumber, shredded carrots & onion with italian salad dressing.", category: "Sides" },
  { name: "Mega loaded fries", price: "$19", description: "Mega serve of shoestring fries with bacon, shallots & cheese, great for sharing.", category: "Sides" },
  { name: "Smoked salmon on sourdough", price: "$16", description: "Smoked salmon & smashed avocado with italian glaze, fresh cucumber, tomato, mixed greens & onion with crispy sourdough", category: "Mains" },
];

// A compact subset for venues that don't need the full menu
const MENU_ITEMS_COMPACT = MENU_ITEMS_ALL.filter((_, i) => i % 3 === 0);

// Contacts pool — rotated across clients
const CONTACTS = [
  { contactName: "Sarah Mitchell", contactPhone: "0412 345 678" },
  { contactName: "James Kowalski", contactPhone: "0423 891 234" },
  { contactName: "Priya Sharma", contactPhone: "0437 562 109" },
  { contactName: "Tom Nguyen", contactPhone: "0451 778 920" },
  { contactName: "Emma Walters", contactPhone: "0468 234 567" },
  { contactName: "David Okafor", contactPhone: "0409 123 456" },
  { contactName: "Chloe Brennan", contactPhone: "0442 987 654" },
  { contactName: "Marco Di Luca", contactPhone: "0415 334 221" },
  { contactName: "Aisha Tan", contactPhone: "0499 654 321" },
  { contactName: "Luke Petersen", contactPhone: "0431 007 890" },
  { contactName: "Sophie O'Brien", contactPhone: "0477 543 210" },
  { contactName: "Ryan Blackwood", contactPhone: "0488 102 938" },
  { contactName: "Nina Castillo", contactPhone: "0414 876 543" },
  { contactName: "Ben Takahashi", contactPhone: "0426 345 678" },
  { contactName: "Leah Dempsey", contactPhone: "0453 210 987" },
  { contactName: "Chris Papadopoulos", contactPhone: "0461 098 765" },
  { contactName: "Yasmin Haddad", contactPhone: "0439 765 432" },
  { contactName: "Oliver Grant", contactPhone: "0445 890 123" },
  { contactName: "Fatima Mensah", contactPhone: "0418 567 890" },
  { contactName: "Sam Keating", contactPhone: "0402 234 567" },
];

// ── clients ───────────────────────────────────────────────────────────────────

const clients = [
  { name: "Bumbles Café", existing_customer: false,      type: "Cafe",  priority: "P2", walletShare: 0, upside: 32953.28, ingredients: [],        gaps: ["beef eye fillet", "fresh salmon fillet", "bug meat slipper lobster green"],           lat: -27.9944534, lng: 153.4245 },
  { name: "Bennys Burger", existing_customer: false,           type: "Restaurant",         priority: "P3", walletShare: 0, upside: 11476.08,  ingredients: [],   gaps: ["beef burger patty", "beef brisket", "chicken burger crumbed"],                         lat: -28.0032391, lng: 153.429119 },
  { name: "Chevron Tavern",  existing_customer: false,      type: "Restaurant",  priority: "P2", walletShare: 0, upside: 28467.58 , ingredients: [],          gaps: ["lamb cutlets", "whole tiger prawn", "beef sirloin"],          lat: -27.9978325, lng: 153.4195145 },
  { name: "Finn McCool's Surfers Paradise",  existing_customer: false,         type: "Bar",         priority: "P2", walletShare: 0, upside: 30376.01,  ingredients: [],         gaps: ["beef brisket", "chicken breast schnitzel tru cut", "beef burger patty"],               lat: -28.0016414, lng: 153.4278493 },
  { name: "Hurricanes Grill & Bar", existing_customer: false,           type: "Restaurant",  priority: "P1", walletShare: 0, upside: 110926.05,  ingredients: [],      gaps: ["grain fed beef t-bone", "whole cooked lobster", "wagyu beef tomahawk"],          lat: -28.001611, lng: 153.4304446 },
  { name: "George's Paragon Seafood Restaurant", existing_customer: false,       type: "Restaurant",  priority: "P1", walletShare: 0, upside: 65660.65, ingredients: [],   gaps: ["lamb eye fillet", "snapper fillet", "lamb eye fillet"],           lat: -27.8529075, lng: 153.3632106 },
  { name: "Gold Coast Tavern", existing_customer: false,     type: "Restaurant",        priority: "P1", walletShare: 0, upside: 49730.81,  ingredients: [],      gaps: ["beef sirloin", "lamb rump", "fresh barramundi fillet skin on"],              lat: -28.000099, lng: 153.4137185 },
  { name: "Central Lounge Bar and Dining", existing_customer: false,       type: "Restaurant",         priority: "P1", walletShare: 0, upside: 40227.30,  ingredients: [],   gaps: ["beef eye fillet", "beef fillet mignon", "beef sirloin roast boneless"],lat: -27.9997522586407, lng: 153.42959560943927 },
  { name: "HOTA Café", existing_customer: false,         type: "Cafe",  priority: "P4", walletShare: 0, upside: 9236.10, ingredients: [],        gaps: ["king prawn cooked peeled", "beer battered whiting fillets", "lamb kofta"],  lat: -28.0015223, lng: 153.4163824 },
  { name: "Driftwood Social", existing_customer: false,        type: "Pub",        priority: "P4", walletShare: 40, upside: 9088.51,  ingredients: [],          gaps: ["beef sirloin", "wagyu tajima beef patties", "red snapper fillets"],           lat: -28.006227, lng: 153.4286512 },

  { name: "BMD Northcliffe Surf Club", existing_customer: true,    type: "Restaurant",  priority: "P1", walletShare: 25, upside: 148993.74 , ingredients: ["beef eye fillet bonded", "beef sirloin", "beef rump"],   gaps: ["beef t-bone whole", "beef steak scotch fillet", "wagyu tajima beef patties"],          lat: -28.0106732, lng: 153.4318525 },
  { name: "COAST Beach Bar", existing_customer: true,         type: "Bar",        priority: "P2", walletShare: 17, upside: 69571.35 ,  ingredients: ["beef cube roll 7 rib", "purebred wagyu beef rump", "wagyu beef flap"],      gaps: ["beef t-bone", "beef sirloin", "beef rump black angus"],            lat: -28.0136355, lng: 153.4298962 },
  { name: "D'arcy Arms Hotel", existing_customer: true,     type: "Hotel",  priority: "P2", walletShare: 8, upside: 61515.97,  ingredients: ["Pizza Flour", "Tomato Passata", "Mozzarella"],  gaps: ["00 Flour Bulk", "Buffalo Mozzarella"],     lat: -28.0120755, lng: 153.4298774 },
  { name: "Club Paradise", existing_customer: true,  type: "Restaurant",  priority: "P1", walletShare: 6, upside:  136720.79 ,  ingredients: ["Jasmine Rice", "Coconut Cream", "Lemongrass"],  gaps: ["Thai Basil Bulk", "Kaffir Lime Leaves"],   lat: -28.0024592, lng: 153.4276628 },
  { name: "House of Brews", existing_customer: true,      type: "Restaurant",  priority: "P2", walletShare: 9, upside: 62100.45 , ingredients: ["Duck Breast", "Foie Gras", "Black Truffle"],    gaps: ["Wagyu Beef Cheek", "Périgord Truffle"],    lat: -28.0007048, lng: 153.429735 },
  { name: "The Island Gold Coast", existing_customer: true,     type: "Hotel",  priority: "P1", walletShare: 3, upside: 119983.10 ,  ingredients: ["Lamb Rack", "Feta", "Olives", "Pita"],          gaps: ["Lamb Rack Bulk", "PDO Feta"],              lat: -28.0029566, lng: 153.4284364 },
  { name: "Paradise Resort", existing_customer: true,        type: "Resort",  priority: "P1", walletShare: 28, upside: 122386.08,  ingredients: ["Beef Brisket", "Pork Ribs", "Smoking Wood"],    gaps: ["Wagyu Brisket", "Hickory Chips Bulk"],     lat: -27.9933333, lng: 153.4275 },
  { name: "Crowne Plaza Surfers Paradise", existing_customer: true,     type: "Hotel",  priority: "P1", walletShare: 12, upside: 130063.87,  ingredients: ["Sushi Rice", "Nori", "Salmon", "Tuna"],         gaps: ["Sashimi-grade Tuna", "Ikura"],             lat: -28.0183044, lng: 153.4302013 },
  { name: "Hilton Surfers Paradise", existing_customer: true,    type: "Hotel",  priority: "P2", walletShare: 14, upside: 57779.59, ingredients: ["Lobster", "Oysters", "Champagne Butter"],       gaps: ["Moreton Bay Bug", "Sea Urchin"],           lat: -28.000775, lng: 153.4291005 },
  { name: "Brazilian Grill Bar", existing_customer: true,      type: "Restaurant",  priority: "P2", walletShare: 10, upside: 74463.00,  ingredients: ["Lamb Mince", "Flatbread", "Tahini"],            gaps: ["Sumac Bulk", "Pomegranate Molasses"],      lat: -28.0017556, lng: 153.4305179 },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log("--- Starting Database Seeding ---");
    await client.query("BEGIN");

    // Clear existing data
    await client.query(
      "TRUNCATE TABLE warehouse_details, clients_search CASCADE",
    );

    for (const c of clients) {
      const id = uuidv4();

      // Pre-compute gap and ingredient data so upside_value is derived from real numbers
      const gapData = c.gaps.map((gap) => ({
        sku: gap,
        potentialMocoSku: "MOCO-SKU-123",
        potentialWeeklyValue: Math.floor(Math.random() * 1200 + 200),
      }));

      const ingredientData = c.ingredients.map((ing, i) => ({
        name: ing,
        mocoStatus: i % 3 === 0 ? "Sells Now" : i % 3 === 1 ? "Can Sell" : "Can't Sell",
        usageKgPerWeek: Math.floor(Math.random() * 40 + 5),
        weeklyValue: Math.floor(Math.random() * 800 + 100),
      }));

      // Upside = annual value of all gap SKUs (weekly × 52)
      const upsideValue =
        Math.round(
          (gapData.reduce((sum, g) => sum + g.potentialWeeklyValue, 0) * 52) / 100,
        ) * 100;

      const topGaps = gapData.slice(0, 2).map((g) => g.sku).join(", ");

      // Insert into Search Cache (Fast Table)
      await client.query(
        "INSERT INTO clients_search (id, name, business_type, priority, moco_wallet_share, upside_value, ingredients_flat, top_gaps, gap_count, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
        [id, c.name, c.type, c.priority, c.walletShare, upsideValue, c.ingredients.join(", "), topGaps, c.gaps.length, c.lat, c.lng],
      );

      const clientIndex = clients.indexOf(c);
      const contact = CONTACTS[clientIndex % CONTACTS.length]!;
      // Restaurants and hotels get the full menu; others get a compact subset
      const menuItems =
        c.type === "Restaurant" || c.type === "Hotel" || c.type === "Resort"
          ? MENU_ITEMS_ALL
          : MENU_ITEMS_COMPACT;

      // Insert into Warehouse Details (Slow Table)
      await client.query(
        `INSERT INTO warehouse_details (client_id, menu_ingredients, sku_gaps, purchase_trends, operational_data, competitor_intel, menu_items)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          id,
          JSON.stringify(ingredientData),
          JSON.stringify(gapData),
          JSON.stringify({
            months: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
            spend: [
              Math.floor(Math.random() * 5000 + 1000),
              Math.floor(Math.random() * 5000 + 1000),
              Math.floor(Math.random() * 5000 + 1000),
              Math.floor(Math.random() * 5000 + 1000),
              Math.floor(Math.random() * 5000 + 1000),
              Math.floor(Math.random() * 5000 + 1000),
            ],
            categories: {
              Protein: Math.floor(Math.random() * 3000 + 500),
              Produce: Math.floor(Math.random() * 2000 + 200),
              Dairy: Math.floor(Math.random() * 1500 + 100),
              Dry: Math.floor(Math.random() * 1000 + 100),
              Other: Math.floor(Math.random() * 800 + 50),
            },
          }),
          JSON.stringify({
            peak: "Friday 7pm",
            trends: "Increasing",
            seatingCapacity: Math.floor(Math.random() * 120 + 20),
            openDays: "Mon–Sun",
            contactName: contact.contactName,
            contactPhone: contact.contactPhone,
          }),
          JSON.stringify({
            nearbyCompetitors: ["Metro Fresh Foods", "City Wholesale"],
            recentNews: "Expanded menu in Q4 2025",
            lastScraped: "2026-02-20",
          }),
          JSON.stringify(menuItems),
        ],
      );

      console.log(`Seeded client: ${c.name}`);
    }

    await client.query("COMMIT");
    console.log("--- Seeding Completed Successfully ---");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seeding Failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
