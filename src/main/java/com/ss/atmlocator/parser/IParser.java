package com.ss.atmlocator.parser;

import com.ss.atmlocator.entity.AtmOffice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by maks on 15.12.2014.
 */
@Service
public interface IParser {
    public void setParameter(Map<String, String> parameters);
    public List<AtmOffice> parse();
}
