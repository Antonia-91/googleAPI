# "The Labyrint of Daedalus": How to add tags to search terms.
When adding a tag to a searchterm, the front sends an array containing two nested arrays. The first array contains the ids of the searchterms selected for tagging. The second array contains two values: the id of the tag selected and the id of the group of which the tag is a member.
The problem presented is such: each search term can only be tagged with one tag from each group. Thus, if a search term is selected for tagging but is already tagged with a tag from the same group, the current tag needs to be removed before the new tag can be added. So the process is as follows:
1. All searchterms with ids containted in the first nested array are fetched from the db.
2. All tags that are members of the group stated by the second value in the second nested array are fetched from the db.
3. The searh term ids from the front are looped through and each corresponding 