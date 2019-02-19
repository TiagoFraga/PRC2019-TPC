<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="text" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates select="prizes"/>   
    </xsl:template>
    
    <xsl:template match="prize">
        ###  http://www.prc.di.uminho.pt/2019/prizes#<xsl:value-of select="year"/><xsl:value-of select="category"/>
        &lt;http://www.prc.di.uminho.pt/2019/prizes#<xsl:value-of select="year"/><xsl:value-of select="category"/>&gt; rdf:type owl:NamedIndividual ,
            :Prize ;
            
            <xsl:for-each select="laureates">
                :hasLaureate &lt;http://www.prc.di.uminho.pt/2019/prizes#<xsl:value-of select="id"/>&gt; ;
            </xsl:for-each>
            :overallMotivation "<xsl:value-of select="overallMotivation"/>" ;
            :category "<xsl:value-of select="category"/>" ;
            :year <xsl:value-of select="year"/> .
        
        <xsl:apply-templates select="laureates"/>  
    
    </xsl:template>
    
    <xsl:template match="laureates">
        ###  http://www.prc.di.uminho.pt/2019/prizes#<xsl:value-of select="id"/>
        &lt;http://www.prc.di.uminho.pt/2019/prizes#<xsl:value-of select="id"/>&gt; rdf:type owl:NamedIndividual ,
            :Person ;
            :firstname "<xsl:value-of select="firstname"/>" ;
            :id <xsl:value-of select="id"/> ;
            <xsl:if test="motivation">
            :motivation <xsl:value-of select="motivation"/>;
            </xsl:if>
            :share <xsl:value-of select="share"/> ;
            :surname "<xsl:value-of select="surname"/>" .
    </xsl:template>
    
    
    
    
</xsl:stylesheet>