package net.ravendb.demo.test.textSearch;

import net.ravendb.demo.common.DocumentStoreHolder;
import net.ravendb.demo.textSearch.highlightQueryResultsMapReduce.HighlightQueryResultsMapReduce;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

public class HighlightQueryResultsMapReduceTest {

    @Test
    public void test() {
        DocumentStoreHolder.mediaStore.executeIndex(new HighlightQueryResultsMapReduce.ArtistsAllSongs());
        HighlightQueryResultsMapReduce.RunParams runParams = new HighlightQueryResultsMapReduce.RunParams();

        runParams.setSearchTerm("smile");
        runParams.setPreTag("(:");
        runParams.setPostTag(":)");
        runParams.setFragmentLength(80);
        runParams.setFragmentCount(1);

        List<HighlightQueryResultsMapReduce.DataToShow> results = new HighlightQueryResultsMapReduce().run(runParams);
        Assert.assertTrue(results.size() == 13);
    }
}
